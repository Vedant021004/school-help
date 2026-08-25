import os
import glob
from pathlib import Path
from typing import List, Dict, Any, Tuple, Optional, Union
import numpy as np
from PIL import Image
from sklearn.neighbors import NearestNeighbors

from carteye.embedder import CartEyeEmbedder


class CartEyeMatcher:
    """
    Best-Fit Product Matcher & Classifier.
    Uses deep image embeddings with distance-weighted k-Nearest Neighbors
    and Cosine Similarity to achieve high-accuracy retail item recognition.
    """

    def __init__(
        self,
        embedder: CartEyeEmbedder,
        knowledge_base_dir: str = "data/knowledge_base/crops/object",
        n_neighbors: int = 5,
        cache_path: Optional[str] = "data/knowledge_base_embeddings.npz",
        min_similarity_threshold: float = 0.35,
    ):
        self.embedder = embedder
        self.knowledge_base_dir = knowledge_base_dir
        self.n_neighbors = n_neighbors
        self.cache_path = cache_path
        self.min_similarity_threshold = min_similarity_threshold

        self.classes: List[str] = []
        self.image_paths: List[str] = []
        self.embeddings: np.ndarray = np.empty((0, 0))
        self.knn_model: Optional[NearestNeighbors] = None
        self.class_prototypes: Dict[str, np.ndarray] = {}

        self.build_index()

    def build_index(self, force_recompute: bool = False):
        """
        Builds the k-NN search index from reference images in the knowledge base.
        Caches embeddings for near-instant reload.
        """
        if not force_recompute and self.cache_path and os.path.exists(self.cache_path):
            try:
                cached = np.load(self.cache_path, allow_pickle=True)
                # Check if embedder model matches cache
                cached_model = str(cached.get("model_name", ""))
                if cached_model == self.embedder.model_name:
                    self.classes = list(cached["classes"])
                    self.image_paths = list(cached["image_paths"])
                    self.embeddings = cached["embeddings"]
                    self._fit_knn()
                    self._compute_prototypes()
                    return
            except Exception as e:
                print(f"[CartEye] Cache load failed ({e}), re-indexing knowledge base...")

        # Scan knowledge base
        pattern = os.path.join(self.knowledge_base_dir, "**", "*.*")
        all_files = glob.glob(pattern, recursive=True)
        valid_extensions = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
        image_files = [
            f for f in all_files if Path(f).suffix.lower() in valid_extensions
        ]

        if not image_files:
            print(f"[CartEye Warning] No reference images found in {self.knowledge_base_dir}")
            return

        classes_list = []
        paths_list = []
        emb_list = []

        for img_path in image_files:
            folder_name = os.path.basename(os.path.dirname(img_path))
            classes_list.append(folder_name)
            paths_list.append(img_path)

        # Batch compute embeddings
        print(f"[CartEye] Indexing {len(image_files)} reference product crops with {self.embedder.model_name}...")
        batch_size = 32
        for i in range(0, len(image_files), batch_size):
            batch_files = image_files[i : i + batch_size]
            batch_embs = self.embedder.get_embeddings_batch(batch_files)
            emb_list.append(batch_embs)

        self.embeddings = np.vstack(emb_list)
        self.classes = classes_list
        self.image_paths = paths_list

        self._fit_knn()
        self._compute_prototypes()

        # Save cache
        if self.cache_path:
            os.makedirs(os.path.dirname(self.cache_path), exist_ok=True)
            np.savez_compressed(
                self.cache_path,
                classes=np.array(self.classes),
                image_paths=np.array(self.image_paths),
                embeddings=self.embeddings,
                model_name=self.embedder.model_name,
            )

    def _fit_knn(self):
        """Fit NearestNeighbors with cosine metric."""
        if len(self.embeddings) == 0:
            return
        n_neighbors = min(self.n_neighbors, len(self.embeddings))
        self.knn_model = NearestNeighbors(
            metric="cosine", n_neighbors=n_neighbors, algorithm="brute"
        )
        self.knn_model.fit(self.embeddings)

    def _compute_prototypes(self):
        """Calculate mean class prototype vectors."""
        self.class_prototypes = {}
        unique_classes = set(self.classes)
        classes_arr = np.array(self.classes)
        for cls_name in unique_classes:
            idx = np.where(classes_arr == cls_name)[0]
            cls_embs = self.embeddings[idx]
            mean_vec = np.mean(cls_embs, axis=0)
            mean_vec = mean_vec / (np.linalg.norm(mean_vec) + 1e-8)
            self.class_prototypes[cls_name] = mean_vec

    def match_embedding(
        self, query_emb: np.ndarray, temperature: float = 0.15
    ) -> Dict[str, Any]:
        """
        Best-fit classification for a single normalized query embedding.

        Uses distance-weighted cosine scoring:
        Closer neighbors receive exponentially higher weight.
        """
        if self.knn_model is None or len(self.embeddings) == 0:
            return {
                "product": "unknown",
                "confidence": 0.0,
                "similarity": 0.0,
                "top_matches": [],
            }

        query_emb = query_emb.reshape(1, -1)
        k = min(self.n_neighbors, len(self.embeddings))
        dists, indices = self.knn_model.kneighbors(query_emb, n_neighbors=k)

        dists = dists[0]
        indices = indices[0]

        # Cosine similarity s = 1 - cosine_distance
        sims = np.clip(1.0 - dists, 0.0, 1.0)
        best_sim = float(sims[0])

        # Rejection threshold for unknown products
        if best_sim < self.min_similarity_threshold:
            return {
                "product": "unknown_item",
                "confidence": float(best_sim),
                "similarity": best_sim,
                "top_matches": [],
            }

        # Distance-weighted exponential softmax voting
        # w_i = exp(sim_i / temperature)
        weights = np.exp(sims / temperature)
        weights = weights / (np.sum(weights) + 1e-8)

        class_weights: Dict[str, float] = {}
        top_matches = []

        for idx, sim, w in zip(indices, sims, weights):
            cls_name = self.classes[idx]
            ref_path = self.image_paths[idx]
            class_weights[cls_name] = class_weights.get(cls_name, 0.0) + float(w)
            top_matches.append({
                "class": cls_name,
                "similarity": float(sim),
                "distance": float(1.0 - sim),
                "ref_image": ref_path,
            })

        # Best fit class is the one with highest weighted score
        best_class, class_confidence = max(class_weights.items(), key=lambda x: x[1])

        return {
            "product": best_class,
            "confidence": float(class_confidence),
            "similarity": best_sim,
            "top_matches": top_matches,
        }

    def match_crops(
        self, crops: List[Union[Image.Image, np.ndarray, str]]
    ) -> List[Dict[str, Any]]:
        """Match a batch of product crops."""
        if not crops:
            return []

        embeddings = self.embedder.get_embeddings_batch(crops)
        results = []
        for i in range(len(crops)):
            match_res = self.match_embedding(embeddings[i])
            results.append(match_res)
        return results

    def add_reference_crop(self, image: Union[str, Image.Image], class_name: str):
        """Dynamically register a new reference product image."""
        emb = self.embedder.get_embedding(image)
        self.classes.append(class_name)
        img_path = str(image) if isinstance(image, str) else f"custom_{len(self.classes)}.jpg"
        self.image_paths.append(img_path)
        if len(self.embeddings) == 0:
            self.embeddings = emb.reshape(1, -1)
        else:
            self.embeddings = np.vstack([self.embeddings, emb.reshape(1, -1)])

        self._fit_knn()
        self._compute_prototypes()
