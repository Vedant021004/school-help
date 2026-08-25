import os
from typing import List, Union
import numpy as np
from PIL import Image
import torch
from torchvision import models, transforms


class CartEyeEmbedder:
    """
    Extracts deep visual embeddings for product crops using vision backbones
    such as DINOv2 (Vision Transformer) or ResNet / EfficientNet.
    Embeddings are L2-normalized for optimal cosine similarity matching.
    """

    def __init__(self, model_name: str = "dinov2_small", device: str = None):
        """
        Args:
            model_name: 'dinov2_small' (default, fast SOTA ViT), 'dinov2_base', 'resnet18', 'resnet50', or 'efficientnet'
            device: 'cuda', 'cpu', or None (auto-detect)
        """
        self.model_name = model_name.lower()
        if device is None:
            self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        else:
            self.device = torch.device(device)

        self._init_model()

    def _init_model(self):
        if "dinov2" in self.model_name:
            self._init_dinov2()
        elif "resnet50" in self.model_name:
            self._init_resnet50()
        elif "resnet" in self.model_name:
            self._init_resnet18()
        elif "efficientnet" in self.model_name:
            self._init_efficientnet()
        else:
            # Default to DINOv2 small
            self._init_dinov2()

    def _init_dinov2(self):
        try:
            from transformers import AutoImageProcessor, AutoModel

            hf_model_name = (
                "facebook/dinov2-base"
                if "base" in self.model_name
                else "facebook/dinov2-small"
            )
            self.processor = AutoImageProcessor.from_pretrained(hf_model_name)
            self.model = AutoModel.from_pretrained(hf_model_name).to(self.device)
            self.model.eval()
            self.embed_type = "transformers_dinov2"
            self.embed_dim = (
                768 if "base" in self.model_name else 384
            )
        except Exception as e:
            print(f"[CartEye] Transformers DINOv2 loading notice ({e}). Falling back to Torchvision ResNet50.")
            self._init_resnet50()

    def _init_resnet18(self):
        self.model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
        self.model = torch.nn.Sequential(*(list(self.model.children())[:-1])).to(self.device)
        self.model.eval()
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
        self.embed_type = "torchvision_cnn"
        self.embed_dim = 512

    def _init_resnet50(self):
        self.model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
        self.model = torch.nn.Sequential(*(list(self.model.children())[:-1])).to(self.device)
        self.model.eval()
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
        self.embed_type = "torchvision_cnn"
        self.embed_dim = 2048

    def _init_efficientnet(self):
        self.model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
        self.model = torch.nn.Sequential(*(list(self.model.children())[:-1])).to(self.device)
        self.model.eval()
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
        self.embed_type = "torchvision_cnn"
        self.embed_dim = 1280

    def _load_image(self, img_input: Union[str, Image.Image, np.ndarray]) -> Image.Image:
        """Helper to ensure input is a PIL RGB Image."""
        if isinstance(img_input, str):
            img = Image.open(img_input).convert("RGB")
        elif isinstance(img_input, np.ndarray):
            # Convert BGR (cv2) or RGB numpy array to PIL
            if img_input.ndim == 3 and img_input.shape[2] == 3:
                img = Image.fromarray(img_input)
            else:
                img = Image.fromarray(img_input).convert("RGB")
        elif isinstance(img_input, Image.Image):
            img = img_input.convert("RGB")
        else:
            raise ValueError(f"Unsupported image input type: {type(img_input)}")
        return img

    def get_embedding(self, image: Union[str, Image.Image, np.ndarray]) -> np.ndarray:
        """Extract normalized embedding vector (1D numpy array) for a single image."""
        img = self._load_image(image)

        with torch.no_grad():
            if self.embed_type == "transformers_dinov2":
                inputs = self.processor(images=img, return_tensors="pt").to(self.device)
                outputs = self.model(**inputs)
                emb = outputs.last_hidden_state[:, 0, :]  # CLS token
            else:
                tensor = self.transform(img).unsqueeze(0).to(self.device)
                emb = self.model(tensor)
                emb = emb.view(emb.size(0), -1)

            # L2 normalize
            emb = torch.nn.functional.normalize(emb, p=2, dim=-1)
            return emb.squeeze(0).cpu().numpy()

    def get_embeddings_batch(self, images: List[Union[str, Image.Image, np.ndarray]]) -> np.ndarray:
        """Extract normalized embeddings for a batch of images."""
        if not images:
            return np.empty((0, self.embed_dim))

        pil_images = [self._load_image(img) for img in images]

        with torch.no_grad():
            if self.embed_type == "transformers_dinov2":
                inputs = self.processor(images=pil_images, return_tensors="pt").to(self.device)
                outputs = self.model(**inputs)
                emb = outputs.last_hidden_state[:, 0, :]
            else:
                tensors = torch.stack([self.transform(img) for img in pil_images]).to(self.device)
                emb = self.model(tensors)
                emb = emb.view(emb.size(0), -1)

            emb = torch.nn.functional.normalize(emb, p=2, dim=-1)
            return emb.cpu().numpy()

    # Legacy compatibility alias
    def getVec(self, image):
        return self.get_embedding(image)
