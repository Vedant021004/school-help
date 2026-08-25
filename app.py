import os
import glob
from pathlib import Path
import streamlit as st
from PIL import Image
import pandas as pd
import time
import random

from carteye.pipeline import CartEyePipeline
from carteye.synthesizer import SyntheticCheckoutGenerator

# Page configuration
st.set_page_config(
    page_title="CartEye - Smart Cart & Shelf Product Identifier",
    page_icon="👁️",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Custom CSS
st.markdown("""
<style>
    .main-title {
        font-size: 2.2rem;
        font-weight: 800;
        color: #1e293b;
        margin-bottom: 0.2rem;
    }
    .sub-title {
        font-size: 1.05rem;
        color: #64748b;
        margin-bottom: 1.5rem;
    }
    .metric-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
    .metric-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: #0284c7;
    }
    .metric-label {
        font-size: 0.85rem;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
</style>
""", unsafe_allow_html=True)


@st.cache_resource(show_spinner="Initializing CartEye AI Pipeline...")
def load_carteye_pipeline(embedder_name: str, k: int, min_sim: float):
    return CartEyePipeline(
        yolo_model_path="models/best.pt" if os.path.exists("models/best.pt") else "best.pt",
        embedder_name=embedder_name,
        knowledge_base_dir="data/knowledge_base/crops/object",
        n_neighbors=k,
        min_similarity_threshold=min_sim,
    )


@st.cache_resource(show_spinner="Loading Synthetic Scene Generator...")
def load_synthesizer():
    return SyntheticCheckoutGenerator(knowledge_base_dir="data/knowledge_base/crops/object")


def main():
    st.markdown('<div class="main-title">👁️ CartEye</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-title">AI-Powered Smart Cart & Retail Shelf Product Identifier • YOLOv8 + DINOv2 Deep Embeddings + RPC Methodology</div>', unsafe_allow_html=True)

    # Sidebar Controls
    st.sidebar.header("⚙️ CartEye Settings")

    embedder_choice = st.sidebar.selectbox(
        "Vision Embedder Backbone",
        options=["dinov2_small", "dinov2_base", "resnet50", "resnet18", "efficientnet"],
        index=0,
        help="DINOv2 provides top-tier visual similarity; ResNet/EfficientNet are fast CNN alternatives.",
    )

    conf_thresh = st.sidebar.slider(
        "YOLO Detection Confidence",
        min_value=0.10,
        max_value=0.90,
        value=0.40,
        step=0.05,
        help="Minimum confidence required to detect a product facing.",
    )

    iou_thresh = st.sidebar.slider(
        "NMS IoU Threshold",
        min_value=0.10,
        max_value=0.90,
        value=0.45,
        step=0.05,
        help="Non-maximum suppression threshold to remove duplicate boxes.",
    )

    k_neighbors = st.sidebar.slider(
        "k-NN Neighbors (Best-Fit)",
        min_value=1,
        max_value=15,
        value=5,
        step=1,
        help="Number of nearest reference crops used for distance-weighted voting.",
    )

    min_sim_thresh = st.sidebar.slider(
        "Rejection Similarity Threshold",
        min_value=0.10,
        max_value=0.80,
        value=0.35,
        step=0.05,
        help="Minimum cosine similarity required, otherwise flagged as unknown.",
    )

    # Initialize Pipeline & Synthesizer
    pipeline = load_carteye_pipeline(embedder_choice, k_neighbors, min_sim_thresh)
    synthesizer = load_synthesizer()

    # Sidebar Knowledge Base summary
    st.sidebar.markdown("---")
    st.sidebar.subheader("📚 Knowledge Base")
    num_classes = len(set(pipeline.matcher.classes))
    num_samples = len(pipeline.matcher.image_paths)
    st.sidebar.info(f"**Classes Registered:** {num_classes}\n\n**Reference Crops:** {num_samples}")

    # Tabs
    tab_scan, tab_synth, tab_gallery, tab_kb, tab_info = st.tabs([
        "🛒 Cart & Shelf Scanner",
        "🎨 Synthetic Scene Generator (RPC)",
        "🔍 Detected Crop Gallery",
        "📂 Knowledge Base",
        "ℹ️ RPC Methodology & Architecture",
    ])

    with tab_scan:
        col_input, col_settings = st.columns([2, 1])

        with col_input:
            input_mode = st.radio(
                "Select Image Source:",
                options=["Sample Images", "Upload Image", "Camera Capture"],
                horizontal=True,
            )

            image_to_process = None

            if input_mode == "Sample Images":
                sample_options = {
                    "Supermarket Shelf (Testing)": "data/img/testing.jpg",
                    "Retail Full Shelf": "data/img/retail.jpg",
                    "Coca-Cola Single Crop": "data/img/cocacola_bottle.jpeg",
                }
                selected_sample = st.selectbox("Choose sample image:", list(sample_options.keys()))
                img_path = sample_options[selected_sample]
                if os.path.exists(img_path):
                    image_to_process = Image.open(img_path).convert("RGB")
                    st.image(image_to_process, caption=f"Selected: {selected_sample}", use_container_width=True)

            elif input_mode == "Upload Image":
                uploaded_file = st.file_uploader(
                    "Upload a shelf or cart image (JPG/PNG)",
                    type=["jpg", "jpeg", "png", "webp"],
                )
                if uploaded_file is not None:
                    image_to_process = Image.open(uploaded_file).convert("RGB")
                    st.image(image_to_process, caption="Uploaded Image", use_container_width=True)

            elif input_mode == "Camera Capture":
                cam_pic = st.camera_input("Take a photo of the cart / shelf")
                if cam_pic is not None:
                    image_to_process = Image.open(cam_pic).convert("RGB")

        with col_settings:
            st.markdown("### 🚀 Execution")
            st.write("Detect all product facings, match brands against knowledge base, and generate inventory summary.")
            run_btn = st.button("✨ Run CartEye Analysis", type="primary", use_container_width=True)

        if run_btn and image_to_process is not None:
            with st.spinner("Processing with CartEye AI..."):
                t0 = time.time()
                results = pipeline.process_image(
                    image_input=image_to_process,
                    conf=conf_thresh,
                    iou=iou_thresh,
                )
                elapsed = time.time() - t0

            st.session_state["carteye_results"] = results
            st.success(f"Analysis completed in {elapsed:.2f} seconds!")

            # Metrics Row
            m1, m2, m3, m4 = st.columns(4)
            with m1:
                st.markdown(
                    f'<div class="metric-card"><div class="metric-value">{results["total_items"]}</div><div class="metric-label">Total Items Detected</div></div>',
                    unsafe_allow_html=True,
                )
            with m2:
                distinct_skus = len(results["inventory_summary"])
                st.markdown(
                    f'<div class="metric-card"><div class="metric-value">{distinct_skus}</div><div class="metric-label">Distinct Products</div></div>',
                    unsafe_allow_html=True,
                )
            with m3:
                avg_acc = (
                    sum(item["confidence"] for item in results["items"]) / len(results["items"])
                    if results["items"]
                    else 0.0
                )
                st.markdown(
                    f'<div class="metric-card"><div class="metric-value">{avg_acc:.1%}</div><div class="metric-label">Avg Match Confidence</div></div>',
                    unsafe_allow_html=True,
                )
            with m4:
                st.markdown(
                    f'<div class="metric-card"><div class="metric-value">{elapsed*1000:.0f} ms</div><div class="metric-label">Inference Time</div></div>',
                    unsafe_allow_html=True,
                )

            st.markdown("---")

            col_res_img, col_res_table = st.columns([3, 2])
            with col_res_img:
                st.subheader("🎯 Annotated Detections")
                st.image(
                    results["annotated_image"],
                    caption=f"CartEye AI: {results['total_items']} bounding boxes localized & classified",
                    use_container_width=True,
                )

            with col_res_table:
                st.subheader("📊 Cart Inventory Summary")
                if results["inventory_summary"]:
                    df_inv = pd.DataFrame(results["inventory_summary"])
                    st.dataframe(df_inv, use_container_width=True, hide_index=True)

                    csv_data = df_inv.to_csv(index=False).encode("utf-8")
                    st.download_button(
                        label="📥 Download Inventory CSV",
                        data=csv_data,
                        file_name="carteye_inventory.csv",
                        mime="text/csv",
                    )
                else:
                    st.warning("No products detected with the current confidence threshold.")

    with tab_synth:
        st.subheader("🎨 Synthetic Clutter & Checkout Generator (RPC Paper Implementation)")
        st.write("Generate photorealistic cluttered multi-product checkout scenes from single-product exemplars with automatic ground-truth labels:")

        c1, c2, c3 = st.columns([1, 1, 1])
        with c1:
            syn_items = st.slider("Number of Items", min_value=2, max_value=20, value=7)
        with c2:
            syn_clutter = st.selectbox("Clutter Degree (Overlap)", options=["low", "medium", "high"], index=1)
        with c3:
            st.write("")
            st.write("")
            gen_btn = st.button("🎲 Generate Synthetic Scene", type="primary", use_container_width=True)

        if gen_btn or "current_syn_scene" not in st.session_state:
            with st.spinner("Synthesizing checkout scene..."):
                syn_scene = synthesizer.generate_scene(
                    num_items=syn_items,
                    clutter_level=syn_clutter,
                )
                st.session_state["current_syn_scene"] = syn_scene

        current_scene = st.session_state.get("current_syn_scene")
        if current_scene:
            col_s1, col_s2 = st.columns([3, 2])
            with col_s1:
                st.image(current_scene["synthetic_image"], caption="Generated Cluttered Checkout Scene", use_container_width=True)
            with col_s2:
                st.markdown("#### 📋 Ground-Truth Items Placed:")
                gt_df = pd.DataFrame([
                    {"Product": k, "Actual Count": v} for k, v in current_scene["ground_truth_counts"].items()
                ])
                st.dataframe(gt_df, use_container_width=True, hide_index=True)

                test_syn_btn = st.button("🚀 Run CartEye on Synthetic Scene", use_container_width=True)

                if test_syn_btn:
                    with st.spinner("Evaluating CartEye on synthetic scene..."):
                        syn_eval = pipeline.process_image(
                            image_input=current_scene["synthetic_image"],
                            conf=conf_thresh,
                            iou=iou_thresh,
                        )
                        st.subheader("🎯 Detection Result:")
                        st.image(syn_eval["annotated_image"], use_container_width=True)
                        st.write(f"Detected: {syn_eval['total_items']} items (Ground Truth: {current_scene['total_items']})")
                        st.dataframe(syn_eval["inventory_df"], use_container_width=True, hide_index=True)

    with tab_gallery:
        st.subheader("🔍 Individual Detected Crop Breakdown")
        if "carteye_results" in st.session_state and st.session_state["carteye_results"]["items"]:
            items = st.session_state["carteye_results"]["items"]
            st.write(f"Showing {len(items)} detected item crops with top reference matches:")

            cols_per_row = 4
            for i in range(0, len(items), cols_per_row):
                cols = st.columns(cols_per_row)
                for j in range(cols_per_row):
                    if i + j < len(items):
                        item = items[i + j]
                        with cols[j]:
                            st.image(item["crop"], caption=f"#{item['id']} - {item['product']}", use_container_width=True)
                            st.caption(
                                f"**Match:** {item['product']}\n\n"
                                f"**Conf:** {item['confidence']:.0%}\n\n"
                                f"**Sim:** {item['similarity']:.3f}"
                            )
        else:
            st.info("Run an analysis in the 'Cart & Shelf Scanner' tab to inspect detected crops.")

    with tab_kb:
        st.subheader("📂 Knowledge Base Browser")
        kb_classes = sorted(list(set(pipeline.matcher.classes)))
        st.write(f"The knowledge base currently contains **{len(kb_classes)} product categories**:")

        for cls in kb_classes:
            with st.expander(f"📦 Product: **{cls}**"):
                cls_imgs = [
                    p for p, c in zip(pipeline.matcher.image_paths, pipeline.matcher.classes) if c == cls
                ]
                st.write(f"Reference samples: {len(cls_imgs)}")
                preview_cols = st.columns(min(6, max(1, len(cls_imgs))))
                for idx, img_p in enumerate(cls_imgs[:6]):
                    with preview_cols[idx]:
                        st.image(img_p, caption=Path(img_p).name, use_container_width=True)

    with tab_info:
        st.subheader("👁️ RPC Dataset Methodology & Architecture")
        st.markdown("""
        ### Key Solutions from the RPC Paper (*Retail Product Checkout Dataset*):
        1. **Domain Discrepancy Solution (Synthetic Cut-and-Paste)**:
           Instead of hand-annotating thousands of checkout images, we programmatically composite single-product exemplars with random scales, shadows, store lighting perturbations, and 15–40% overlaps.
        2. **Decoupled Architecture**:
           - **Detector**: Class-agnostic YOLOv8 localizes bounding boxes.
           - **Matcher**: Meta's DINOv2 extracts 384-dimensional feature embeddings.
           - **Classifier**: Distance-weighted exponential softmax nearest-neighbors matching against single-product exemplars.
        3. **Hierarchical Coarse-to-Fine Matching**:
           Constrains fine-grained SKU classification to the physical form-factor (Can, PET Bottle, Juice Box, Snack Bag), eliminating false positives across different categories.
        """)


if __name__ == "__main__":
    main()
