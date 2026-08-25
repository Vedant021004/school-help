"""
CartEye - AI-Powered Smart Cart & Shelf Product Identifier.
Combines YOLOv8 SKU detection with deep vision embeddings (DINOv2 / ResNet),
hierarchical coarse-to-fine classification, and synthetic checkout generation (RPC dataset methodology).
"""

from carteye.detector import CartEyeDetector
from carteye.embedder import CartEyeEmbedder
from carteye.matcher import CartEyeMatcher
from carteye.hierarchical_matcher import HierarchicalMatcher
from carteye.pipeline import CartEyePipeline
from carteye.visualizer import CartEyeVisualizer
from carteye.synthesizer import SyntheticCheckoutGenerator

__version__ = "1.1.0"
__all__ = [
    "CartEyePipeline",
    "CartEyeDetector",
    "CartEyeEmbedder",
    "CartEyeMatcher",
    "HierarchicalMatcher",
    "CartEyeVisualizer",
    "SyntheticCheckoutGenerator",
]
