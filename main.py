#!/usr/bin/env python3
"""
CartEye CLI - Smart Cart & Shelf Product Identifier.
Usage:
    python main.py --input "data/img/testing.jpg"
    python main.py --input "data/img/retail.jpg" --embedder dinov2_small --conf 0.45
"""

import argparse
import os
from pathlib import Path
from carteye.pipeline import CartEyePipeline


def main():
    parser = argparse.ArgumentParser(
        description="CartEye: AI-Powered Smart Cart & Shelf Product Identifier"
    )
    parser.add_argument(
        "--input",
        type=str,
        default="data/img/testing.jpg",
        help="Input image path (e.g. data/img/testing.jpg)",
    )
    parser.add_argument(
        "--model",
        type=str,
        default="models/best.pt",
        help="Path to YOLOv8 SKU detection model weights",
    )
    parser.add_argument(
        "--embedder",
        type=str,
        default="dinov2_small",
        choices=["dinov2_small", "dinov2_base", "resnet18", "resnet50", "efficientnet"],
        help="Embedding backbone for product matching (default: dinov2_small)",
    )
    parser.add_argument(
        "--kb",
        type=str,
        default="data/knowledge_base/crops/object",
        help="Directory containing reference product crops categorized by folder",
    )
    parser.add_argument(
        "--conf",
        type=float,
        default=0.40,
        help="Detection confidence threshold (default: 0.40)",
    )
    parser.add_argument(
        "--iou",
        type=float,
        default=0.45,
        help="NMS IoU threshold (default: 0.45)",
    )
    parser.add_argument(
        "--k",
        type=int,
        default=5,
        help="Number of nearest neighbors for best-fit voting (default: 5)",
    )
    parser.add_argument(
        "--output",
        type=str,
        default=None,
        help="Output directory to save predictions, crops, and annotated image (default: data/<image_stem>)",
    )
    parser.add_argument(
        "--no-crops",
        action="store_true",
        help="Disable saving individual cropped product images",
    )

    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"Error: Input file '{args.input}' does not exist.")
        return

    output_dir = args.output
    if output_dir is None:
        stem = Path(args.input).stem
        output_dir = os.path.join("data", stem)

    print(f"\n" + "=" * 60)
    print(f"  👁️  CartEye: Smart Cart & Shelf Product Identifier")
    print(f"=" * 60)
    print(f"  - Input Image     : {args.input}")
    print(f"  - YOLO Weights    : {args.model}")
    print(f"  - Embedder Model  : {args.embedder}")
    print(f"  - Knowledge Base  : {args.kb}")
    print(f"  - Output Directory: {output_dir}")
    print(f"=" * 60 + "\n")

    # Initialize CartEye Pipeline
    pipeline = CartEyePipeline(
        yolo_model_path=args.model,
        embedder_name=args.embedder,
        knowledge_base_dir=args.kb,
        n_neighbors=args.k,
    )

    print(f"[CartEye] Processing image '{args.input}'...")
    results = pipeline.process_image(
        image_input=args.input,
        conf=args.conf,
        iou=args.iou,
        save_dir=output_dir,
        save_crops=not args.no_crops,
    )

    print(f"\n✅ Processing complete!")
    print(f"📊 Total Product Items Identified: {results['total_items']}\n")
    print("📋 Inventory Summary:")
    print("-" * 55)
    print(f"{'Product Name':<25} | {'Count':<6} | {'Avg Confidence':<15}")
    print("-" * 55)
    for entry in results["inventory_summary"]:
        print(
            f"{entry['Product']:<25} | {entry['Count']:<6} | {entry['Avg Confidence']:<15}"
        )
    print("-" * 55)
    print(f"\n📁 Outputs saved to: {output_dir}/")
    print(f"   🖼️  Annotated Image : {os.path.join(output_dir, 'annotated_result.jpg')}")
    print(f"   📄 Text Report     : {os.path.join(output_dir, 'predictions.txt')}")
    print(f"   📊 CSV Report      : {os.path.join(output_dir, 'predictions.csv')}")
    print(f"   📂 Classified Crops: {os.path.join(output_dir, 'crops')}/")


if __name__ == "__main__":
    main()
