import os
import random
import glob
from pathlib import Path
from typing import List, Dict, Any, Tuple, Optional
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance


class SyntheticCheckoutGenerator:
    """
    Implements RPC paper synthetic cut-and-paste data augmentation with domain adaptation.
    Synthesizes realistic cluttered multi-product checkout scenes from isolated single-product exemplars.
    """

    def __init__(self, knowledge_base_dir: str = "data/knowledge_base/crops/object"):
        self.knowledge_base_dir = knowledge_base_dir
        self.catalog: Dict[str, List[str]] = {}
        self._load_catalog()

    def _load_catalog(self):
        pattern = os.path.join(self.knowledge_base_dir, "**", "*.*")
        valid_ext = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
        files = [f for f in glob.glob(pattern, recursive=True) if Path(f).suffix.lower() in valid_ext]

        for f in files:
            cls_name = os.path.basename(os.path.dirname(f))
            if cls_name not in self.catalog:
                self.catalog[cls_name] = []
            self.catalog[cls_name].append(f)

    def _create_background(self, width: int = 1024, height: int = 768, bg_type: str = "counter") -> Image.Image:
        """Create realistic checkout surface or cart texture."""
        if bg_type == "counter":
            # Realistic wood/white/steel texture with noise
            base_color = random.choice([
                (230, 228, 225),  # Off-white checkout counter
                (210, 215, 220),  # Stainless steel tray
                (240, 235, 225),  # Supermarket conveyor belt color
                (195, 185, 170),  # Light wood
            ])
            arr = np.full((height, width, 3), base_color, dtype=np.uint8)
            noise = np.random.normal(0, 5, (height, width, 3)).astype(np.int16)
            arr = np.clip(arr.astype(np.int16) + noise, 0, 255).astype(np.uint8)
            bg = Image.fromarray(arr)
            bg = bg.filter(ImageFilter.GaussianBlur(radius=0.8))
        else:
            bg = Image.new("RGB", (width, height), (235, 235, 235))

        return bg

    def _process_exemplar(
        self,
        img: Image.Image,
        target_size: Tuple[int, int],
        rotation: float,
        apply_lighting: bool = True,
    ) -> Tuple[Image.Image, Image.Image]:
        """Resize, rotate, add shadow mask, and adjust lighting for realistic domain transfer."""
        img = img.convert("RGBA")
        img = img.resize(target_size, Image.Resampling.LANCZOS)

        # Random slight rotation
        if rotation != 0:
            img = img.rotate(rotation, expand=True, resample=Image.Resampling.BICUBIC)

        if apply_lighting:
            # Color & contrast jitter to simulate store lighting
            enh_b = ImageEnhance.Brightness(img)
            img = enh_b.enhance(random.uniform(0.85, 1.15))
            enh_c = ImageEnhance.Contrast(img)
            img = enh_c.enhance(random.uniform(0.9, 1.1))

        # Create soft shadow
        alpha = img.split()[-1]
        shadow = Image.new("RGBA", img.size, (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow)
        shadow_draw.bitmap((0, 0), alpha, fill=(20, 20, 20, 90))
        shadow = shadow.filter(ImageFilter.GaussianBlur(radius=6))

        return img, shadow

    def generate_scene(
        self,
        num_items: int = 8,
        clutter_level: str = "medium",
        width: int = 1024,
        height: int = 768,
        specific_classes: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Generate a synthetic cluttered checkout image with full ground-truth annotations.

        Args:
            num_items: Number of product instances to place
            clutter_level: 'low', 'medium', or 'high' (controls overlap and stacking)
            width, height: Output image dimensions
            specific_classes: Optional subset of classes to sample from
        """
        bg = self._create_background(width, height)
        classes_pool = specific_classes if specific_classes else list(self.catalog.keys())

        if not classes_pool:
            raise ValueError("No classes available in knowledge base catalog.")

        annotations = []
        ground_truth_counts: Dict[str, int] = {}

        # Sort item placement back-to-front for natural occlusion
        y_positions = sorted([random.randint(100, height - 200) for _ in range(num_items)])

        # Max overlap control
        overlap_factor = {"low": 0.1, "medium": 0.35, "high": 0.6}.get(clutter_level, 0.35)

        for i, y_pos in enumerate(y_positions):
            cls_name = random.choice(classes_pool)
            img_path = random.choice(self.catalog[cls_name])

            try:
                ex_img = Image.open(img_path).convert("RGB")
            except Exception:
                continue

            # Random item scaling
            scale = random.uniform(0.8, 1.25)
            orig_w, orig_h = ex_img.size
            new_w = max(50, int(orig_w * scale))
            new_h = max(80, int(orig_h * scale))

            # Limit size to fit within bounds
            if new_w > width // 2 or new_h > height // 2:
                new_w = min(new_w, width // 3)
                new_h = min(new_h, height // 3)

            rot = random.uniform(-25, 25)
            p_img, shadow = self._process_exemplar(ex_img, (new_w, new_h), rot)

            pw, ph = p_img.size
            max_x = max(10, width - pw - 10)
            x_pos = random.randint(10, max_x)

            # Paste drop shadow with slight offset
            bg.paste(shadow, (x_pos + 6, y_pos + 8), shadow)

            # Paste product image
            bg.paste(p_img, (x_pos, y_pos), p_img)

            # Record bounding box [x1, y1, x2, y2]
            box = [x_pos, y_pos, min(width, x_pos + pw), min(height, y_pos + ph)]
            annotations.append({
                "id": i + 1,
                "class": cls_name,
                "box": box,
                "ref_image": img_path,
            })

            ground_truth_counts[cls_name] = ground_truth_counts.get(cls_name, 0) + 1

        # Post-processing: Add subtle lens noise & global store illumination
        bg_rgb = bg.convert("RGB")
        enh_global = ImageEnhance.Color(bg_rgb)
        bg_rgb = enh_global.enhance(1.05)

        return {
            "synthetic_image": bg_rgb,
            "annotations": annotations,
            "ground_truth_counts": ground_truth_counts,
            "total_items": len(annotations),
            "clutter_level": clutter_level,
        }

    def generate_batch(
        self,
        output_dir: str = "data/synthetic_dataset",
        num_scenes: int = 10,
        items_per_scene: Tuple[int, int] = (5, 12),
    ):
        """Generate a batch of synthetic labeled images for detector training/validation."""
        os.makedirs(os.path.join(output_dir, "images"), exist_ok=True)
        os.makedirs(os.path.join(output_dir, "labels"), exist_ok=True)

        print(f"[CartEye] Synthesizing {num_scenes} checkout scenes into {output_dir}...")
        for idx in range(num_scenes):
            n_items = random.randint(items_per_scene[0], items_per_scene[1])
            res = self.generate_scene(num_items=n_items)

            img_file = os.path.join(output_dir, "images", f"syn_checkout_{idx+1:04d}.jpg")
            res["synthetic_image"].save(img_file, quality=95)

            # Save annotations
            label_file = os.path.join(output_dir, "labels", f"syn_checkout_{idx+1:04d}.txt")
            img_w, img_h = res["synthetic_image"].size
            with open(label_file, "w") as f:
                for ann in res["annotations"]:
                    x1, y1, x2, y2 = ann["box"]
                    # YOLO format: cls, cx, cy, w, h
                    cx = ((x1 + x2) / 2.0) / img_w
                    cy = ((y1 + y2) / 2.0) / img_h
                    bw = (x2 - x1) / img_w
                    bh = (y2 - y1) / img_h
                    f.write(f"0 {cx:.6f} {cy:.6f} {bw:.6f} {bh:.6f}\n")

        print(f"✅ Synthesized {num_scenes} scenes successfully.")
