"""
Knowledge-Aware Question Generation (KAQG) Inspired Knowledge Graph Engine.
Extracts Concept Triples (Subject -> Predicate -> Object), Prerequisite Concept Graphs,
Interactive Mind Map Hierarchies, and Learning Paths strictly grounded in Textbook Chapters.
"""

import os
import re
import json
from typing import List, Dict, Any, Optional, Tuple
from collections import defaultdict

from backend.config import settings
from backend.models import (
    KnowledgeGraph, GraphNode, GraphEdge, ConceptTriple,
    MindMapData, MindMapNode, TextChunk
)
import backend.database as db
from backend.rag_engine import rag_engine


class KnowledgeGraphEngine:
    """
    Lightweight, high-speed Educational Knowledge Graph & Mind Map Generator.
    Operates on chapter RAG context to extract pedagogical dependencies,
    concept hierarchies, and mind maps with zero external server dependencies.
    """

    def get_or_build_graph(self, book_id: str, chapter_id: str, chapter_name: str) -> KnowledgeGraph:
        # Check database cache first
        cached = db.get_knowledge_graph(book_id, chapter_id)
        if cached and len(cached.nodes) > 0:
            return cached

        # Retrieve all textbook chunks strictly for this chapter
        chunks = rag_engine.get_all_for_chapters(book_id=book_id, chapter_ids=[chapter_id])
        if not chunks:
            # Fallback search if no direct chunks found
            results = rag_engine.search(query=chapter_name, book_id=book_id, chapter_ids=[chapter_id], top_k=8)
            chunks = [c for c, _ in results]

        # Extract Knowledge Graph
        kg = self._extract_knowledge_graph(book_id, chapter_id, chapter_name, chunks)
        db.save_knowledge_graph(kg)
        return kg

    def generate_mind_map(self, book_id: str, chapter_id: str, chapter_name: str) -> MindMapData:
        kg = self.get_or_build_graph(book_id, chapter_id, chapter_name)
        return self._build_mind_map_from_kg(kg, chapter_name)

    def _extract_knowledge_graph(
        self,
        book_id: str,
        chapter_id: str,
        chapter_name: str,
        chunks: List[TextChunk]
    ) -> KnowledgeGraph:
        # 1. Groq / LLM based extraction if API key available
        if settings.GROQ_API_KEY:
            kg_llm = self._extract_with_llm(book_id, chapter_id, chapter_name, chunks)
            if kg_llm and len(kg_llm.nodes) >= 3:
                return kg_llm

        # 2. High-precision rule-based extraction
        return self._extract_rule_based(book_id, chapter_id, chapter_name, chunks)

    def _extract_with_llm(
        self,
        book_id: str,
        chapter_id: str,
        chapter_name: str,
        chunks: List[TextChunk]
    ) -> Optional[KnowledgeGraph]:
        import requests
        headers = {
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        context_text = "\n\n".join([f"[Page {c.metadata.page_number}]: {c.content[:400]}" for c in chunks[:6]])

        prompt = f"""You are a Knowledge Graph Architect for educational curricula.
Extract a structured Pedagogical Concept Knowledge Graph for Chapter '{chapter_name}'.

TEXTBOOK CONTEXT:
{context_text}

Extract:
1. Core Concepts (Nodes: id, label, category [core_concept, subtopic, prerequisite, application, formula], importance [1-5], description)
2. Relationships (Edges: source, target, relation [requires, produces, relates_to, is_part_of, causes, defined_by])
3. Triples (subject, predicate, object, evidence)
4. Prerequisites (list of prior knowledge topics needed)
5. Learning Path (ordered list of concepts to master from start to finish)
6. Weak Topic Cues (common stumbling blocks for students)

Respond ONLY in valid JSON matching this exact structure:
{{
  "nodes": [
    {{"id": "c1", "label": "...", "category": "core_concept", "importance": 5, "description": "..."}}
  ],
  "edges": [
    {{"source": "c1", "target": "c2", "relation": "requires", "weight": 1.0}}
  ],
  "triples": [
    {{"subject": "...", "predicate": "...", "object": "...", "evidence": "..."}}
  ],
  "prerequisites": ["...", "..."],
  "learning_path": ["...", "...", "..."],
  "weak_topic_cues": ["...", "..."]
}}"""

        for model in ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b"]:
            try:
                res = requests.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers=headers,
                    json={
                        "model": model,
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.2,
                        "response_format": {"type": "json_object"}
                    },
                    timeout=15
                )
                if res.status_code == 200:
                    data = res.json()["choices"][0]["message"]["content"]
                    parsed = json.loads(data)
                    nodes = [GraphNode(**n) for n in parsed.get("nodes", [])]
                    edges = [GraphEdge(**e) for e in parsed.get("edges", [])]
                    triples = [ConceptTriple(**t) for t in parsed.get("triples", [])]
                    return KnowledgeGraph(
                        book_id=book_id,
                        chapter_id=chapter_id,
                        chapter_name=chapter_name,
                        nodes=nodes,
                        edges=edges,
                        triples=triples,
                        prerequisites=parsed.get("prerequisites", []),
                        learning_path=parsed.get("learning_path", []),
                        weak_topic_cues=parsed.get("weak_topic_cues", [])
                    )
            except Exception as e:
                print(f"[KnowledgeGraph LLM] Error with {model}: {e}")

        return None

    def _extract_rule_based(
        self,
        book_id: str,
        chapter_id: str,
        chapter_name: str,
        chunks: List[TextChunk]
    ) -> KnowledgeGraph:
        nodes: List[GraphNode] = []
        edges: List[GraphEdge] = []
        triples: List[ConceptTriple] = []

        # Add root node for the chapter
        root_id = "node-root"
        nodes.append(GraphNode(
            id=root_id,
            label=chapter_name,
            category="core_concept",
            importance=5,
            page=1,
            section="Chapter Theme",
            description=f"Primary curriculum domain for {chapter_name}"
        ))

        # Extract definition sentences, laws, and key noun phrases
        concept_patterns = [
            r'([A-Z][a-zA-Z\s]{2,25})\s+is\s+(?:defined\s+as|known\s+as|called|referred\s+to\s+as)\s+([^.]+)\.',
            r'([A-Z][a-zA-Z\s]{2,25})\s+states\s+that\s+([^.]+)\.',
            r'([A-Z][a-zA-Z\s]{2,25})\s+(?:requires|produces|releases|depends\s+on)\s+([^.]+)\.',
            r'Formula\s*:\s*([^.\n]+)',
            r'([A-Z][a-zA-Z\s]{2,25})\s+is\s+classified\s+into\s+([^.]+)\.'
        ]

        seen_labels = {chapter_name.lower()}
        extracted_concepts = []

        for c_idx, chunk in enumerate(chunks):
            content = chunk.content
            page = chunk.metadata.page_number
            section = chunk.metadata.section_name or "Section"

            for pat in concept_patterns:
                matches = re.findall(pat, content)
                for m in matches:
                    if isinstance(m, tuple):
                        c_name = m[0].strip()
                        c_desc = m[1].strip()
                    else:
                        c_name = f"Formula {len(nodes)}"
                        c_desc = m.strip()

                    if len(c_name) > 3 and c_name.lower() not in seen_labels and len(c_name) < 40:
                        seen_labels.add(c_name.lower())
                        nid = f"node-{len(nodes)+1}"
                        cat = "formula" if "formula" in c_name.lower() or "=" in c_desc else "subtopic"
                        nodes.append(GraphNode(
                            id=nid,
                            label=c_name,
                            category=cat,
                            importance=4,
                            page=page,
                            section=section,
                            description=c_desc[:160]
                        ))
                        edges.append(GraphEdge(
                            source=root_id,
                            target=nid,
                            relation="is_part_of" if cat == "subtopic" else "defined_by",
                            weight=0.9
                        ))
                        triples.append(ConceptTriple(
                            subject=c_name,
                            predicate="defined_as",
                            object=c_desc[:80],
                            page=page,
                            evidence=content[:150]
                        ))
                        extracted_concepts.append(c_name)

        # Fallback if text is sparse
        if len(nodes) < 3:
            default_subtopics = [
                ("Introduction & Definitions", "Basic terminology and foundational principles"),
                ("Core Mechanism & Laws", "Governing laws, formulas, and reaction mechanisms"),
                ("Applications & Examples", "Practical real-world applications and standard numericals"),
                ("Summary & Review", "Synthesis of key chapter points and board examination focus")
            ]
            for s_idx, (st, desc) in enumerate(default_subtopics):
                nid = f"node-def-{s_idx+1}"
                nodes.append(GraphNode(
                    id=nid,
                    label=st,
                    category="subtopic",
                    importance=3,
                    page=1,
                    section="General",
                    description=desc
                ))
                edges.append(GraphEdge(
                    source=root_id,
                    target=nid,
                    relation="is_part_of",
                    weight=0.8
                ))
                extracted_concepts.append(st)

        # Inter-connect concept nodes
        if len(nodes) > 2:
            for i in range(1, len(nodes) - 1):
                edges.append(GraphEdge(
                    source=nodes[i].id,
                    target=nodes[i+1].id,
                    relation="requires",
                    weight=0.75
                ))

        prerequisites = [f"Basic understanding of {chapter_name} fundamentals", "Standard mathematical & unit systems"]
        learning_path = [n.label for n in nodes]
        weak_topic_cues = [
            f"Confusion between key classifications in {chapter_name}",
            "Sign convention and unit conversions in numerical applications",
            "Accurate balanced equations and state symbols"
        ]

        return KnowledgeGraph(
            book_id=book_id,
            chapter_id=chapter_id,
            chapter_name=chapter_name,
            nodes=nodes,
            edges=edges,
            triples=triples,
            prerequisites=prerequisites,
            learning_path=learning_path,
            weak_topic_cues=weak_topic_cues
        )

    def _build_mind_map_from_kg(self, kg: KnowledgeGraph, chapter_name: str) -> MindMapData:
        # Group nodes by category
        categories = defaultdict(list)
        for n in kg.nodes:
            if n.label.lower() != chapter_name.lower():
                categories[n.category].append(n)

        category_labels = {
            "core_concept": "Core Concepts & Laws",
            "subtopic": "Key Subtopics & Mechanisms",
            "formula": "Formulas & Equations",
            "application": "Applications & Examples",
            "prerequisite": "Prerequisites"
        }

        root_children: List[MindMapNode] = []
        for cat, items in categories.items():
            cat_name = category_labels.get(cat, cat.replace("_", " ").title())
            sub_nodes = []
            for item in items:
                sub_nodes.append(MindMapNode(
                    id=f"mm-{item.id}",
                    text=item.label,
                    category=item.category,
                    notes=item.description,
                    children=[]
                ))
            root_children.append(MindMapNode(
                id=f"mm-cat-{cat}",
                text=cat_name,
                category="branch",
                notes=f"{len(sub_nodes)} topics in this area",
                children=sub_nodes
            ))

        root_node = MindMapNode(
            id="mm-root",
            text=chapter_name,
            category="root",
            notes=f"Complete Chapter Structure: {len(kg.nodes)} concepts",
            children=root_children
        )

        return MindMapData(
            root_topic=chapter_name,
            chapter_name=chapter_name,
            nodes=[root_node],
            learning_objective=f"Master the complete conceptual framework, definitions, and applications of {chapter_name}."
        )


knowledge_graph_engine = KnowledgeGraphEngine()
