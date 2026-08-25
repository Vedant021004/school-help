import os
from pathlib import Path
from typing import List, Dict, Any, Optional, Union
from PIL import Image
import pandas as pd

from carteye.detector import CartEyeDetector
from carteye.embedder import CartEyeEmbedder
from carteye.matcher import CartEyeMatcher
from carteye.visualizer import CartEyeVisualizer


class CartEyePipeline:
    """
    End-to-end CartEye pipeline for Retail Shelf & Smart Cart Product Recognition.
    Executes detection -> deep embedding -> distance-weighted best-fit matching -> visual overlay & reporting.
    """

    def __init__(
        self,
        yolo_model_path: str = "models/best.pt",
        embedder_name: str = "dinov2_small",
        knowledge_base_dir: str = "data/knowledge_base/crops/object",
        n_neighbors: int = 5,
        min_similarity_threshold: float = 0.35,
        device: Optional[str] = None,
    ):
        self.detector = CartEyeDetector(model_path=yolo_model_path, device=device)
        self.embedder = CartEyeEmbedder(model_name=embedder_name, device=device)
        self.matcher = CartEyeMatcher(
            embedder=self.embedder,
            knowledge_base_dir=knowledge_base_dir,
            n_neighbors=n_neighbors,
            min_similarity_threshold=min_similarity_threshold,
        )
        self.visualizer = CartEyeVisualizer()

    def process_image(
        self,
        image_input: Union[str, Path, Image.Image],
        conf: float = 0.40,
        iou: float = 0.45,
        imgsz: int = 640,
        save_dir: Optional[str] = None,
        save_crops: bool = True,
    ) -> Dict[str, Any]:
        """
        Process a shelf or smart cart image.

        Args:
            image_input: Path to image or PIL Image
            conf: YOLO detection confidence threshold
            iou: YOLO NMS IoU threshold
            imgsz: Inference resolution
            save_dir: Directory to save reports, crops, and annotated images
            save_crops: Whether to save crop images categorized by product

        Returns:
            Dictionary with full recognition results, inventory summary, and annotated image.
        """
        det_result = self.detector.detect(
            image_input=image_input,
            conf=conf,
            iou=iou,
            imgsz=imgsz,
        )

        orig_img = det_result["orig_image"]
        crops = det_result["crops"]
        boxes = det_result["boxes"]
        det_confs = det_result["confidences"]

        # Run best-fit matching on all crops
        match_results = self.matcher.match_crops(crops)

        items = []
        inventory: Dict[str, Dict[str, Any]] = {}

        for idx, (crop, box, det_c, match) in enumerate(
            zip(crops, boxes, det_confs, match_results)
        ):
            prod = match["product"]
            cls_conf = match["confidence"]
            sim = match["similarity"]
            top_matches = match["top_matches"]

            item_info = {
                "id": idx + 1,
                "box": box,
                "crop": crop,
                "product": prod,
                "confidence": cls_conf,
                "similarity": sim,
                "detection_conf": det_c,
                "top_matches": top_matches,
            }
            items.append(item_info)

            # Update inventory counts
            if prod not in inventory:
                inventory[prod] = {
                    "count": 0,
                    "confidences": [],
                    "similarities": [],
                }
            inventory[prod]["count"] += 1
            inventory[prod]["confidences"].append(cls_conf)
            inventory[prod]["similarities"].append(sim)

        # Compute average metrics per product
        inventory_summary = []
        for prod, data in inventory.items():
            avg_conf = float(sum(data["confidences"]) / len(data["confidences"]))
            avg_sim = float(sum(data["similarities"]) / len(data["similarities"]))
            inventory_summary.append({
                "Product": prod,
                "Count": data["count"],
                "Avg Confidence": f"{avg_conf:.1%}",
                "Avg Similarity": f"{avg_sim:.3f}",
            })

        # Sort summary by count descending
        inventory_summary.sort(key=lambda x: x["Count"], reverse=True)

        # Generate annotated image
        annotated_img = self.visualizer.annotate(
            image=orig_img,
            results=items,
            show_conf=True,
            line_width=3,
        )

        # Optionally save outputs
        if save_dir:
            os.makedirs(save_dir, exist_ok=True)

            # Save annotated image
            annotated_img.save(os.path.join(save_dir, "annotated_result.jpg"))

            # Save text report
            txt_path = os.path.join(save_dir, "predictions.txt")
            with open(txt_path, "w", encoding="utf-8") as f:
                f.write(f"=== CartEye AI Recognition Report ===\n")
                f.write(f"Total Items Detected: {len(items)}\n\n")
                f.write("--- Item Breakdown ---\n")
                for item in items:
                    f.write(
                        f"Item #{item['id']:03d} (Box: {item['box']}): "
                        f"predicted as '{item['product']}' with {item['confidence']:.0%} confidence "
                        f"(cosine similarity: {item['similarity']:.3f})\n"
                    )
                f.write("\n--- Inventory Summary ---\n")
                for entry in inventory_summary:
                    f.write(f"- {entry['Product']}: {entry['Count']} units (Avg Conf: {entry['Avg Confidence']})\n")

            # Save CSV report
            csv_path = os.path.join(save_dir, "predictions.csv")
            csv_rows = []
            for item in items:
                csv_rows.append({
                    "crop_id": item["id"],
                    "product": item["product"],
                    "confidence": f"{item['confidence']:.1%}",
                    "similarity": round(item["similarity"], 4),
                    "box_x1": item["box"][0],
                    "box_y1": item["box"][1],
                    "box_x2": item["box"][2],
                    "box_y2": item["box"][3],
                })
            pd.DataFrame(csv_rows).to_csv(csv_path, index=False)

            # Save categorized crop images
            if save_crops:
                crops_base = os.path.join(save_dir, "crops")
                for item in items:
                    prod_dir = os.path.join(crops_base, item["product"])
                    os.makedirs(prod_dir, exist_ok=True)
                    crop_filename = f"crop_{item['id']:03d}_conf{int(item['confidence']*100)}.jpg"
                    item["crop"].save(os.path.join(prod_dir, crop_filename))

        return {
            "total_items": len(items),
            "items": items,
            "inventory_summary": inventory_summary,
            "inventory_df": pd.DataFrame(inventory_summary) if inventory_summary else pd.DataFrame(),
            "annotated_image": annotated_img,
            "orig_image": orig_img,
        }
