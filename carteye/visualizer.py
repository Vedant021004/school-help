from typing import List, Dict, Any, Tuple
from PIL import Image, ImageDraw, ImageFont
import numpy as np


# Palette of vibrant distinct colors for bounding boxes
COLOR_PALETTE = [
    (239, 68, 68),    # Red
    (34, 197, 94),    # Green
    (59, 130, 246),   # Blue
    (245, 158, 11),   # Amber
    (168, 85, 247),   # Purple
    (236, 72, 153),   # Pink
    (20, 184, 166),   # Teal
    (249, 115, 22),   # Orange
    (99, 102, 241),   # Indigo
    (132, 204, 22),   # Lime
    (6, 182, 212),    # Cyan
    (217, 70, 239),   # Fuchsia
]


class CartEyeVisualizer:
    """
    Renders clean, high-visibility visual annotations, bounding boxes,
    and product tags onto detected cart and shelf images.
    """

    def __init__(self):
        self.class_colors: Dict[str, Tuple[int, int, int]] = {}
        self._color_idx = 0

    def _get_color_for_class(self, class_name: str) -> Tuple[int, int, int]:
        if class_name not in self.class_colors:
            color = COLOR_PALETTE[self._color_idx % len(COLOR_PALETTE)]
            self.class_colors[class_name] = color
            self._color_idx += 1
        return self.class_colors[class_name]

    def annotate(
        self,
        image: Image.Image,
        results: List[Dict[str, Any]],
        show_conf: bool = True,
        line_width: int = 3,
        show_summary_badge: bool = True,
    ) -> Image.Image:
        """
        Draw bounding boxes, brand names, and confidence scores on the image.

        Args:
            image: PIL RGB image
            results: List of dicts containing 'box', 'product', 'confidence'
        """
        annotated = image.copy()
        draw = ImageDraw.Draw(annotated)

        # Load default or available font
        try:
            font = ImageFont.load_default()
        except Exception:
            font = None

        img_w, img_h = annotated.size

        # Draw each detection box
        for res in results:
            box = res.get("box")
            if not box:
                continue
            x1, y1, x2, y2 = box
            product = res.get("product", "item")
            conf = res.get("confidence", 0.0)

            color = self._get_color_for_class(product)

            # Draw rectangle
            for w in range(line_width):
                draw.rectangle(
                    [x1 - w, y1 - w, x2 + w, y2 + w],
                    outline=color,
                )

            # Format label text
            if show_conf:
                label_text = f"{product} ({conf:.0%})"
            else:
                label_text = product

            # Calculate text size using font or bbox
            try:
                text_bbox = draw.textbbox((x1, y1), label_text, font=font)
                text_w = text_bbox[2] - text_bbox[0] + 6
                text_h = text_bbox[3] - text_bbox[1] + 4
            except Exception:
                text_w = len(label_text) * 7 + 6
                text_h = 14

            # Tag background
            tag_y1 = max(0, y1 - text_h - 2)
            tag_y2 = tag_y1 + text_h + 2
            tag_x2 = min(img_w, x1 + text_w)

            draw.rectangle([x1, tag_y1, tag_x2, tag_y2], fill=color)
            draw.text((x1 + 3, tag_y1 + 1), label_text, fill=(255, 255, 255), font=font)

        # Optional Top Header Badge
        if show_summary_badge and len(results) > 0:
            header_text = f"CartEye AI: {len(results)} items identified"
            try:
                h_bbox = draw.textbbox((10, 10), header_text, font=font)
                h_w = h_bbox[2] - h_bbox[0] + 16
                h_h = h_bbox[3] - h_bbox[1] + 10
            except Exception:
                h_w = len(header_text) * 8 + 16
                h_h = 24

            draw.rectangle([10, 10, 10 + h_w, 10 + h_h], fill=(15, 23, 42))  # Dark slate
            draw.rectangle([10, 10, 10 + h_w, 10 + h_h], outline=(59, 130, 246), width=1)
            draw.text((18, 14), header_text, fill=(255, 255, 255), font=font)

        return annotated
