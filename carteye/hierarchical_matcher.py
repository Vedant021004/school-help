import os
from typing import List, Dict, Any, Optional, Tuple, Union
import numpy as np
from PIL import Image
from sklearn.neighbors import NearestNeighbors

from carteye.embedder import CartEyeEmbedder


class HierarchicalMatcher:
    """
    Implements Hierarchical Coarse-to-Fine Matching as recommended in the RPC paper.
    Stage 1: Predicts Meta-Category Form Factor (e.g., Can vs. PET Bottle vs. Juice Box vs. Snack Bag).
    Stage 2: Fine-grained SKU matching within the selected meta-category using DINOv2 cosine distance-weighting.
    """

    # Form factor heuristic mappings
    DEFAULT_META_MAPPING = {
        "can": ["cocacola_can", "cocacola_zero_can", "pepsi_can", "sprite_can"],
        "pet_bottle": ["cocacola_pet", "cream_soda_pet", "fanta_pet", "sprite_pet", "water_pet"],
        "juice_box": ["minute_maid", "tropicana_box", "juice_box"],
        "snack_bag": ["chips_bag", "doritos_bag", "lays_bag"],
        "multibrand": ["multibrand"],
    }

    def __init__(
        self,
        embedder: CartEyeEmbedder,
        knowledge_base_dir: str = "data/knowledge_base/crops/object",
        n_neighbors: int = 5,
        min_similarity_threshold: float = 0.35,
    ):
        self.embedder = embedder
        self.knowledge_base_dir = knowledge_base_dir
        self.n_neighbors = n_neighbors
        self.min_similarity_threshold = min_similarity_threshold

        self.class_to_meta: Dict[str, str] = {}
        self.meta_indices: Dict[str, Dict[str, Any]] = {}
        self.all_classes: List[str] = []
        self.all_embeddings: np.ndarray = np.empty((0, 0))
        self.all_paths: List[str] = []

        self._build_hierarchical_index()

    def _infer_meta_category(self, class_name: str) -> str:
        """Map class name to broad physical form factor."""
        c_low = class_name.lower()
        if "can" in c_low:
            return "can"
        elif "pet" in c_low or "bottle" in c_low:
            return "pet_bottle"
        elif "maid" in c_low or "juice" in c_low or "box" in c_low:
            return "juice_box"
        elif "bag" in c_low or "chip" in c_low or "snack" in c_low:
            return "snack_bag"
        else:
            return "general_product"

    def _build_hierarchical_index(self):
        """Index embeddings by both global and meta-category hierarchy."""
        import glob
        from pathlib import Path

        pattern = os.path.join(self.knowledge_base_dir, "**", "*.*")
        valid_ext = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
        image_files = [f for f in glob.glob(pattern, recursive=True) if Path(f).suffix.lower() in valid_ext]

        if not image_files:
            return

        classes_list = []
        paths_list = []
        emb_list = []
        meta_buckets: Dict[str, Dict[str, List[Any]]] = {}

        print(f"[Hierarchical CartEye] Indexing knowledge base into meta-categories...")
        for img_path in image_files:
            cls_name = os.path.basename(os.path.dirname(img_path))
            meta = self._infer_meta_category(cls_name)
            self.class_to_meta[cls_name] = meta

            classes_list.append(cls_name)
            paths_list.append(img_path)

            if meta not in meta_buckets:
                meta_buckets[meta] = {"paths": [], "classes": []}
            meta_buckets[meta]["paths"].append(img_path)
            meta_buckets[meta]["classes"].append(cls_name)

        # Batch embed all images
        self.all_embeddings = self.embedder.get_embeddings_batch(image_files)
        self.all_classes = classes_list
        self.all_paths = paths_list

        # Build sub-indexes for each meta-category
        offset = 0
        for meta, bucket in meta_buckets.items():
            count = len(bucket["paths"])
            sub_embs = self.all_embeddings[offset : offset + count]
            offset += count

            k = min(self.n_neighbors, len(sub_embs))
            knn = NearestNeighbors(metric="cosine", n_neighbors=k, algorithm="brute")
            knn.fit(sub_embs)

            # Compute meta-prototype vector
            proto = np.mean(sub_embs, axis=0)
            proto = proto / (np.linalg.norm(proto) + 1e-8)

            self.meta_indices[meta] = {
                "knn": knn,
                "embeddings": sub_embs,
                "classes": bucket["classes"],
                "paths": bucket["paths"],
                "prototype": proto,
            }

        # Also fit global KNN for fallback
        k_global = min(self.n_neighbors, len(self.all_embeddings))
        self.global_knn = NearestNeighbors(metric="cosine", n_neighbors=k_global, algorithm="brute")
        self.global_knn.fit(self.all_embeddings)

    def match_crop(
        self,
        crop: Union[Image.Image, np.ndarray, str],
        temperature: float = 0.15,
        enforce_meta_filter: bool = True,
    ) -> Dict[str, Any]:
        """
        Runs hierarchical coarse-to-fine matching:
        1. Classifies candidate meta-category via prototype alignment & aspect ratio.
        2. Performs fine-grained distance-weighted KNN within the meta-category.
        """
        emb = self.embedder.get_embedding(crop)

        # Level 1: Find best-fit meta category
        best_meta = None
        best_meta_sim = -1.0
        meta_scores = {}

        for meta, data in self.meta_indices.items():
            proto = data["prototype"]
            sim = float(np.dot(emb, proto))
            meta_scores[meta] = sim
            if sim > best_meta_sim:
                best_meta_sim = sim
                best_meta = meta

        # Level 2: Fine-grained search in candidate meta-category
        if enforce_meta_filter and best_meta and best_meta in self.meta_indices:
            sub_data = self.meta_indices[best_meta]
            k = min(self.n_neighbors, len(sub_data["embeddings"]))
            dists, idxs = sub_data["knn"].kneighbors(emb.reshape(1, -1), n_neighbors=k)
            sims = np.clip(1.0 - dists[0], 0.0, 1.0)
            classes_sub = [sub_data["classes"][i] for i in idxs[0]]
            paths_sub = [sub_data["paths"][i] for i in idxs[0]]
        else:
            # Fallback to global KNN
            k = min(self.n_neighbors, len(self.all_embeddings))
            dists, idxs = self.global_knn.kneighbors(emb.reshape(1, -1), n_neighbors=k)
            sims = np.clip(1.0 - dists[0], 0.0, 1.0)
            classes_sub = [self.all_classes[i] for i in idxs[0]]
            paths_sub = [self.all_paths[i] for i in idxs[0]]

        top_sim = float(sims[0])

        if top_sim < self.min_similarity_threshold:
            return {
                "product": "unknown_item",
                "meta_category": best_meta or "unknown",
                "confidence": top_sim,
                "similarity": top_sim,
                "top_matches": [],
            }

        # Distance-weighted softmax voting
        weights = np.exp(sims / temperature)
        weights = weights / (np.sum(weights) + 1e-8)

        class_weights: Dict[str, float] = {}
        top_matches = []
        for c, s, w, p in zip(classes_sub, sims, weights, paths_sub):
            class_weights[c] = class_weights.get(c, 0.0) + float(w)
            top_matches.append({
                "class": c,
                "similarity": float(s),
                "ref_image": p,
            })

        best_product, conf = max(class_weights.items(), key=lambda x: x[1])

        return {
            "product": best_product,
            "meta_category": best_meta,
            "meta_confidence": best_meta_sim,
            "confidence": float(conf),
            "similarity": top_sim,
            "top_matches": top_matches,
        }

    def match_crops_batch(self, crops: List[Union[Image.Image, np.ndarray, str]]) -> List[Dict[str, Any]]:
        return [self.match_crop(c) for c in crops]
