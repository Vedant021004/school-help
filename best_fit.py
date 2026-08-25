"""
CartEye Best-Fit Engine.
Provides standalone best-fit product classification and SKU identification.
"""

import os
import pickle
import argparse
from pathlib import Path
from PIL import Image
import pandas as pd
import numpy as np

from carteye.pipeline import CartEyePipeline


def generate_and_save_best_fit_model(
    output_pkl: str = "best_fit.pkl",
    model_weights: str = "best.pt",
    embedder_name: str = "dinov2_small",
    knowledge_base_dir: str = "data/knowledge_base/crops/object",
):
    """
    Fits the best-fit embedding index and saves a portable serialized best_fit.pkl package.
    """
    print(f"[CartEye] Fitting best-fit index on {knowledge_base_dir} with {embedder_name}...")
    pipeline = CartEyePipeline(
        yolo_model_path=model_weights if os.path.exists(model_weights) else "models/best.pt",
        embedder_name=embedder_name,
        knowledge_base_dir=knowledge_base_dir,
        n_neighbors=5,
    )

    best_fit_bundle = {
        "model_name": embedder_name,
        "classes": pipeline.matcher.classes,
        "image_paths": pipeline.matcher.image_paths,
        "embeddings": pipeline.matcher.embeddings,
        "class_prototypes": pipeline.matcher.class_prototypes,
        "knn_model": pipeline.matcher.knn_model,
        "yolo_weights": model_weights,
    }

    with open(output_pkl, "wb") as f:
        pickle.dump(best_fit_bundle, f)

    print(f"✅ Saved Best-Fit bundle to: {output_pkl}")
    return pipeline


def predict_best_fit(
    image_path: str,
    conf: float = 0.40,
    save_output: bool = True,
    output_dir: str = "data/best_fit_output",
):
    """
    Predict best-fit products for any given shelf or cart image.
    """
    pipeline = CartEyePipeline(
        yolo_model_path="best.pt" if os.path.exists("best.pt") else "models/best.pt",
        embedder_name="dinov2_small",
        knowledge_base_dir="data/knowledge_base/crops/object",
        n_neighbors=5,
    )

    results = pipeline.process_image(
        image_input=image_path,
        conf=conf,
        save_dir=output_dir if save_output else None,
    )

    return results


def main():
    parser = argparse.ArgumentParser(description="CartEye Best-Fit Prediction Tool")
    parser.add_argument("--image", type=str, default="data/img/testing.jpg", help="Input image path")
    parser.add_argument("--conf", type=float, default=0.40, help="YOLO confidence threshold")
    parser.add_argument("--out", type=str, default="data/best_fit_output", help="Output directory")
    args = parser.parse_args()

    # Build/update best_fit.pkl bundle
    generate_and_save_best_fit_model("best_fit.pkl")

    print(f"\nRunning Best-Fit evaluation on: {args.image}")
    results = predict_best_fit(args.image, conf=args.conf, output_dir=args.out)

    print("\n" + "=" * 55)
    print(f"  🏆 CartEye Best-Fit Results ({results['total_items']} items identified)")
    print("=" * 55)
    for entry in results["inventory_summary"]:
        print(f"  • {entry['Product']:<20} : {entry['Count']} units (Confidence: {entry['Avg Confidence']})")
    print("=" * 55)
    print(f"\nAnnotated visual output saved to: {os.path.join(args.out, 'annotated_result.jpg')}")


if __name__ == "__main__":
    main()
