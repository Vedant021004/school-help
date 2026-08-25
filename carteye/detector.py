import os
from typing import List, Dict, Any, Union
from pathlib import Path
from PIL import Image
import numpy as np
from ultralytics import YOLO


class CartEyeDetector:
    """
    CartEye Product Facing & SKU Detector using fine-tuned YOLOv8.
    Accurately localizes individual product instances (facings) on shelves and smart carts.
    """

    def __init__(self, model_path: str = "models/best.pt", device: str = None):
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"YOLO model weights not found at: {model_path}")
        self.model_path = model_path
        self.model = YOLO(model_path)
        self.device = device

    def detect(
        self,
        image_input: Union[str, Path, Image.Image, np.ndarray],
        conf: float = 0.40,
        iou: float = 0.45,
        imgsz: int = 640,
    ) -> Dict[str, Any]:
        """
        Run detection and extract high-quality bounding boxes and crops.

        Returns:
            Dictionary containing:
            - 'orig_image': PIL RGB image
            - 'boxes': list of [x1, y1, x2, y2]
            - 'confidences': list of detection confidences
            - 'crops': list of PIL images cropped from bounding boxes
            - 'num_detected': total count of facings
        """
        if isinstance(image_input, (str, Path)):
            orig_img = Image.open(str(image_input)).convert("RGB")
            src = str(image_input)
        elif isinstance(image_input, np.ndarray):
            orig_img = Image.fromarray(image_input).convert("RGB")
            src = np.array(orig_img)
        elif isinstance(image_input, Image.Image):
            orig_img = image_input.convert("RGB")
            src = np.array(orig_img)
        else:
            raise ValueError(f"Unsupported image input type: {type(image_input)}")

        results = self.model.predict(
            source=src,
            conf=conf,
            iou=iou,
            imgsz=imgsz,
            device=self.device,
            verbose=False,
        )

        detections = []
        crops = []
        boxes_list = []
        conf_list = []

        img_w, img_h = orig_img.size

        if len(results) > 0 and results[0].boxes is not None:
            boxes = results[0].boxes.xyxy.cpu().numpy()
            confs = results[0].boxes.conf.cpu().numpy()

            for idx, (box, score) in enumerate(zip(boxes, confs)):
                x1, y1, x2, y2 = box
                x1 = max(0, int(round(x1)))
                y1 = max(0, int(round(y1)))
                x2 = min(img_w, int(round(x2)))
                y2 = min(img_h, int(round(y2)))

                # Check for valid bounding box dimensions
                if x2 <= x1 or y2 <= y1:
                    continue

                crop = orig_img.crop((x1, y1, x2, y2))
                crops.append(crop)
                boxes_list.append([x1, y1, x2, y2])
                conf_list.append(float(score))

                detections.append({
                    "id": idx,
                    "box": [x1, y1, x2, y2],
                    "det_conf": float(score),
                    "crop": crop,
                })

        return {
            "orig_image": orig_img,
            "detections": detections,
            "boxes": boxes_list,
            "confidences": conf_list,
            "crops": crops,
            "num_detected": len(crops),
        }
