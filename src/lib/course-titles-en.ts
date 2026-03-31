export const partTitlesEn: Record<string, { title: string; shortTitle: string; description: string }> = {
  "fondamentaux": { title: "Fundamentals", shortTitle: "Fundamentals", description: "From zero to competent — ML, Deep Learning, NLP, and LLM basics" },
  "state-of-the-art": { title: "State of the Art", shortTitle: "SOTA", description: "Advanced techniques — Architectures, training, inference, RAG, agents" },
  "mlops": { title: "MLOps & Engineering", shortTitle: "MLOps", description: "Infrastructure, pipelines, LLMOps, and data engineering" },
  "domaines": { title: "Specialized Domains", shortTitle: "Domains", description: "Robotics, Medical, AI for Science" },
  "mistral": { title: "Mistral AI", shortTitle: "Mistral", description: "Dedicated section — Models, engineering, products, solutions" },
  "ecosysteme": { title: "AI Ecosystem", shortTitle: "Ecosystem", description: "Major players, benchmarks, and foundational papers" },
  "mathematiques": { title: "Mathematical Foundations", shortTitle: "Math", description: "All the mathematical foundations needed to understand AI: linear algebra, calculus, probability, optimization, information theory" },
  "ressources": { title: "Resources & Glossary", shortTitle: "Resources", description: "Glossary, tools, frameworks, communities" },
};

export const moduleTitlesEn: Record<string, string> = {
  // Part 1: Fundamentals
  "ml-bases": "Machine Learning — The Basics",
  "deep-learning": "Deep Learning — Fundamental Architectures",
  "transformer": "The Transformer — The Architecture That Changed Everything",
  "nlp": "NLP — From Classical to Modern",
  "llm-basics": "LLM — Understanding Large Language Models",

  // Part 2: State of the Art
  "post-transformer": "Post-Transformer Architectures",
  "attention-advanced": "Advanced Attention Mechanisms",
  "training-modern": "Training — Modern Training Techniques",
  "peft": "Efficient Fine-tuning (PEFT)",
  "inference": "Inference & Optimization",
  "rag": "Retrieval Augmented Generation (RAG)",
  "agents": "Agents & Tool Use",
  "multimodal": "Multimodal AI",
  "reasoning": "Reasoning Models",
  "securite-interpretabilite": "Security & Interpretability",

  // Part 3: MLOps & Engineering
  "infrastructure": "Infrastructure & Compute",
  "mlops-pipeline": "MLOps Pipeline",
  "llmops": "LLMOps",
  "data-engineering": "Data Engineering for AI",

  // Part 4: Specialized Domains
  "robotics": "Robotics & Embodied AI",
  "medical": "AI for Healthcare / Medical",
  "ai-science": "AI for Science",

  // Part 5: Mistral AI
  "mistral-strategy": "Overview & Strategy",
  "mistral-models": "Mistral Models — Complete Catalog",
  "mistral-engineering": "Mistral Engineering",
  "mistral-products": "Products & Platform",
  "mistral-api": "API Capabilities in Detail",
  "mistral-solutions": "Solutions & Deployment",

  // Part 6: AI Ecosystem
  "actors": "Major Players — Technical Profiles",
  "benchmarks": "Benchmarks & Evaluation",
  "seminal-papers": "Annotated Foundational Papers",

  // Part 7: Mathematical Foundations
  "algebre-lineaire": "Linear Algebra",
  "calcul": "Differential and Integral Calculus",
  "probabilites": "Probability and Statistics",
  "optimisation": "Optimization",
  "theorie-information": "Information Theory",

  // Part 8: Resources & Glossary
  "resources": "Resources",
};

export const lessonTitlesEn: Record<string, string> = {
  // ===== Part 1: Fundamentals =====

  // Module: ML Basics
  "ml-overview": "What is Machine Learning? An Overview",
  "supervised-learning": "Supervised Learning: Classification vs Regression",
  "unsupervised-learning": "Unsupervised Learning: Clustering, Dimensionality Reduction",
  "reinforcement-learning-basics": "Reinforcement Learning: Fundamental Principles",
  "perceptron": "The Perceptron and Simple Neural Networks",
  "backpropagation": "Backpropagation: How a Network Learns",
  "gradient-descent": "Gradient Descent: SGD, Momentum, Nesterov",
  "optimizers": "Modern Optimizers: Adam, AdamW, LAMB",
  "loss-functions": "Loss Functions: Cross-Entropy, MSE, Contrastive Loss",
  "overfitting": "Overfitting and Underfitting: Diagnosis and Solutions",
  "regularization": "Regularization: L1, L2, Dropout, Early Stopping",
  "normalization": "Batch Normalization and Layer Normalization",
  "metrics-basics": "Evaluation Metrics: Accuracy, Precision, Recall, F1",
  "metrics-advanced": "Advanced Metrics: AUC-ROC, Confusion Matrix, Calibration",
  "data-splitting": "Train/Validation/Test Split, Cross-Validation, Data Leakage",
  "computational-complexity": "Computational Complexity: P, NP, Kolmogorov and AI",

  // Module: Deep Learning
  "cnn": "Convolutional Neural Networks (CNN): Convolutions, Pooling, Feature Maps",
  "cnn-architectures": "Classic CNN Architectures: LeNet, AlexNet, VGG, ResNet",
  "transfer-learning-vision": "Transfer Learning in Vision: Fine-tuning Pre-trained Models",
  "rnn": "Recurrent Neural Networks (RNN): Sequences and Memory",
  "lstm-gru": "LSTM and GRU: Solving the Vanishing Gradient",
  "seq2seq-attention": "Seq2Seq and the Attention Mechanism (Bahdanau)",
  "autoencoders": "Autoencoders: Compression and Reconstruction",
  "vae": "Variational Autoencoders (VAE)",
  "gan": "Generative Adversarial Networks (GAN)",
  "gan-advanced": "Advanced GAN Architectures: StyleGAN, CycleGAN, WGAN",
  "diffusion-models-basics": "Diffusion Models: Fundamental Principles",
  "score-based-flow": "Score-based Generative Models and Flow Matching",

  // Module: Transformer
  "transformer-overview": "Attention Is All You Need: Overview",
  "self-attention": "Self-Attention: Query, Key, Value in Detail",
  "multi-head-attention": "Multi-Head Attention: Why and How",
  "positional-encoding": "Positional Encoding: Sinusoidal vs Learned vs RoPE",
  "encoder-decoder": "Complete Encoder-Decoder Architecture",
  "ffn-residual": "Feed-Forward Networks and Residual Connections",
  "pre-post-norm": "Pre-norm vs Post-norm: Impact on Training",
  "transformer-vs-rnn": "Why the Transformer Replaced RNNs",

  // Module: NLP
  "tokenization-bpe": "Tokenization: BPE (Byte Pair Encoding)",
  "tokenization-other": "Tokenization: WordPiece, SentencePiece, Unigram",
  "word2vec": "Word Embeddings: Word2Vec (CBOW, Skip-gram)",
  "glove-fasttext": "GloVe and FastText: Contextual vs Static Embeddings",
  "bert": "BERT: Bidirectional Pre-training, MLM, NSP",
  "bert-variants": "BERT Variants: RoBERTa, ALBERT, DeBERTa, DistilBERT",
  "gpt": "GPT: Auto-regressive Language Modeling",
  "t5": "T5: Text-to-Text Transfer Transformer",
  "bart": "BART and Encoder-Decoder Models for Generation",
  "sentence-embeddings": "Sentence Embeddings and Similarity: SBERT",

  // Module: LLM Basics
  "llm-overview": "What is an LLM? Definition, Scale, Emergent Capabilities",
  "scaling-laws-kaplan": "Scaling Laws: Kaplan's Laws",
  "chinchilla": "Chinchilla and Optimal Scaling Laws",
  "pretraining": "Pre-training: Data, Objectives (CLM, MLM, Span Corruption)",
  "pretraining-datasets": "Pre-training Datasets: Common Crawl, The Pile, RedPajama, FineWeb",
  "finetuning-overview": "Full Fine-tuning vs Parameter-Efficient Fine-tuning",
  "rlhf": "RLHF: Reinforcement Learning from Human Feedback",
  "dpo": "DPO: Direct Preference Optimization",
  "constitutional-ai": "Constitutional AI",
  "orpo-kto": "ORPO, KTO and Alternatives to RLHF/DPO",
  "emergent-abilities": "Emergent Abilities and Phase Transitions in LLMs",
  "in-context-learning": "In-Context Learning: How Does It Work?",
  "prompt-engineering": "Prompt Engineering: Zero-shot, Few-shot, System Prompts",
  "chain-of-thought": "Chain-of-Thought Prompting",
  "structured-output": "Structured Output: JSON Mode, Function Calling, Grammars",

  // ===== Part 2: State of the Art =====

  // Module: Post-Transformer Architectures
  "moe-principles": "Mixture of Experts (MoE): Principles, Routing, Sparse Gating",
  "moe-practice": "MoE in Practice: Mixtral, DeepSeek-MoE, Grok",
  "expert-routing": "Expert Choice Routing vs Token Choice Routing",
  "s4": "State Space Models: S4",
  "mamba": "Mamba: Selective State Spaces",
  "mamba2-jamba": "Mamba-2 and Jamba: SSM + Attention Hybrids",
  "rwkv": "RWKV: Linear RNN at Transformer Scale",
  "retnet": "RetNet (Retention Networks)",
  "hyena": "Hyena and Long Convolutions",
  "hybrid-architectures": "Hybrid Architectures: The Best of Both Worlds",

  // Module: Advanced Attention Mechanisms
  "mqa": "Multi-Query Attention (MQA)",
  "gqa": "Grouped Query Attention (GQA)",
  "flash-attention": "Flash Attention: Algorithm and Impact",
  "flash-attention-2": "Flash Attention 2",
  "flash-attention-3": "Flash Attention 3 and Hardware Optimizations",
  "sliding-window-attention": "Sliding Window Attention (Mistral)",
  "ring-attention": "Ring Attention: Ultra-long Contexts",
  "sparse-attention": "Sparse Attention Patterns: Longformer, BigBird",
  "linear-attention": "Linear Attention and Sub-quadratic Alternatives",
  "kv-cache": "KV Cache: Operation, Compression, Quantization",
  "rope": "RoPE (Rotary Position Embedding) in Detail",
  "alibi": "ALiBi and Alternatives to RoPE",
  "context-extension": "Context Window Extension: YaRN, NTK-aware Scaling",

  // Module: Modern Training Techniques
  "mixed-precision": "Mixed Precision Training: FP16, BF16",
  "fp8-training": "FP8 Training and Quantization-Aware Training",
  "data-parallelism": "Data Parallelism (DP) and Distributed Data Parallel (DDP)",
  "tensor-parallelism": "Tensor Parallelism: Splitting Matrices",
  "pipeline-parallelism": "Pipeline Parallelism: Splitting Layers",
  "sequence-parallelism": "Sequence Parallelism and Context Parallelism",
  "zero": "ZeRO: Stage 1, 2, 3 (DeepSpeed)",
  "fsdp": "FSDP (Fully Sharded Data Parallelism) - Native PyTorch",
  "megatron-lm": "Megatron-LM: Massive Training at NVIDIA",
  "gradient-checkpointing": "Gradient Checkpointing / Activation Recomputation",
  "gradient-accumulation": "Gradient Accumulation and Effective Batch Size",
  "lr-scheduling": "Learning Rate Scheduling: Warmup, Cosine, WSD",
  "curriculum-learning": "Curriculum Learning and Data Ordering",
  "data-quality": "Data Quality: Deduplication, Filtering, Toxicity Removal",
  "synthetic-data-training": "Synthetic Data for Training: Techniques and Risks",
  "continual-pretraining": "Continual Pre-training and Domain Adaptation",
  "scaling-infra": "Scaling Infrastructure: Networking (InfiniBand, NVLink), Storage",

  // Module: PEFT
  "lora": "LoRA (Low-Rank Adaptation) in Detail",
  "qlora": "QLoRA: 4-bit Fine-tuning",
  "dora": "DoRA: Weight-Decomposed Low-Rank Adaptation",
  "adapters": "Adapters: Additive Modules",
  "prefix-tuning": "Prefix Tuning",
  "prompt-tuning": "Prompt Tuning and Soft Prompts",
  "ia3": "IA3 (Infused Adapter by Inhibiting and Amplifying Inner Activations)",
  "peft-comparison": "PEFT: Method Comparison, When to Use What",
  "instruction-tuning": "Instruction Tuning: FLAN, Alpaca, OpenHermes, Orca",
  "rlhf-practice": "RLHF in Practice: Tools (TRL, OpenRLHF)",
  "grpo-odpo": "GRPO & oDPO: Beyond PPO for Alignment",
  "dpo-practice": "DPO in Practice: Datasets, Hyperparameters",
  "model-merging-ties": "Model Merging: TIES",
  "model-merging-dare": "Model Merging: DARE, Model Soups, SLERP",
  "eval-post-finetuning": "Post Fine-tuning Evaluation: Benchmarks and Human Eval",
  "cpt-long-context": "CPT & Long Context Extension",
  "muon-lr-schedulers": "Muon & Advanced LR Schedulers",

  // Module: Inference & Optimization
  "quantization-concepts": "Quantization: Concepts (INT8, INT4, FP4, NF4)",
  "gptq": "GPTQ: Post-training Quantization",
  "awq": "AWQ (Activation-aware Weight Quantization)",
  "gguf-llamacpp": "GGUF and llama.cpp: Quantization for CPU/Edge",
  "squeezellm": "SqueezeLLM and Other Recent Techniques",
  "speculative-decoding": "Speculative Decoding: Draft Model + Verification",
  "medusa": "Medusa: Multi-head Speculative Decoding",
  "batching": "Continuous Batching and Dynamic Batching",
  "paged-attention": "PagedAttention and vLLM",
  "tensorrt-llm": "TensorRT-LLM: NVIDIA Compilation and Optimization",
  "onnx-runtime": "ONNX Runtime and Cross-platform Runtimes",
  "distillation": "Model Distillation: Teacher-Student",
  "pruning": "Pruning: Structured vs Unstructured, Magnitude, Wanda",
  "serving-frameworks": "Serving Frameworks Compared: vLLM, TGI, Triton, SGLang",
  "ollama-local": "Ollama and llama.cpp: Local Inference",
  "memory-optimization": "Memory Optimization: Activation Offloading, Tensor Offloading",
  "qat": "QAT: Quantization Aware Training",
  "model-serving": "Model Serving: Deploying an LLM in Production",
  "model-conversions": "Model Conversions: Formats and Compatibility",

  // Module: RAG
  "rag-overview": "RAG: Principle and Architecture",
  "text-embeddings": "Text Embeddings: Models and Choices",
  "vector-databases": "Vector Databases: Pinecone, Weaviate, Milvus, Chroma, Qdrant",
  "chunking": "Chunking Strategies: Fixed, Semantic, Recursive, Document-aware",
  "retrieval-methods": "Dense Retrieval vs Sparse Retrieval (BM25) vs Hybrid",
  "reranking": "Reranking: Cross-encoders and ColBERT",
  "advanced-rag": "Advanced RAG: Self-querying, HyDE",
  "graph-rag": "Graph RAG: Knowledge Graph Integration",
  "agentic-rag": "Agentic RAG: Routing, Multi-step Retrieval",
  "rag-evaluation": "RAG Evaluation: RAGAS, Faithfulness, Context Relevance",
  "long-context-vs-rag": "Long-context vs RAG: When to Use What?",

  // Module: Agents & Tool Use
  "agents-overview": "LLM Agents: Definition and Taxonomy",
  "react": "ReAct Pattern: Reasoning + Acting",
  "function-calling": "Function Calling: Design and Implementation",
  "autogen": "Multi-agent Systems: AutoGen",
  "crewai-langgraph": "CrewAI, LangGraph: Agent Orchestration",
  "tree-of-thoughts": "Planning: Tree of Thoughts",
  "graph-of-thoughts": "Planning: Graph of Thoughts",
  "code-agents": "Code Generation Agents: Devin, Cursor, Claude Code, Copilot",
  "agent-memory": "Memory for Agents: Short-term, Long-term, Episodic, Semantic",
  "mcp": "MCP (Model Context Protocol): Integration Standard",
  "tool-use-patterns": "Tool Use and API Orchestration: Advanced Patterns",
  "agent-evaluation": "Agent Evaluation: Benchmarks (SWE-bench, WebArena)",

  // Module: Multimodal AI
  "vlm": "Vision-Language Models: Architecture and Training",
  "clip": "CLIP and Contrastive Vision-Text Learning",
  "vision-models-comparison": "GPT-4V, Gemini Vision, Claude Vision: Comparison",
  "pixtral": "Pixtral (Mistral): Multimodal Approach",
  "text-to-image": "Text-to-Image: Stable Diffusion, SDXL, Flux",
  "diffusion-models-images": "Diffusion Models for Images: DDPM, DDIM, Classifier-free Guidance",
  "text-to-video": "Text-to-Video: Sora, Runway Gen-3, Kling, Veo",
  "whisper-asr": "Text-to-Audio: Whisper (ASR)",
  "tts": "Text-to-Speech: Bark, ElevenLabs, XTTS, F5-TTS",
  "document-ocr": "Document Understanding & OCR: LayoutLM, Donut, Mistral OCR",
  "unified-multimodal": "Unified Multimodal Architectures: Gemini, GPT-4o",

  // Module: Reasoning Models
  "cot-fundamentals": "Chain-of-Thought Prompting: Fundamentals",
  "self-consistency": "Self-consistency and Majority Voting",
  "openai-o1": "OpenAI o1: Reasoning at Inference Time",
  "openai-o3-o4": "OpenAI o3/o4-mini: Reasoning Evolution",
  "deepseek-r1": "DeepSeek R1: Open-source Reasoning",
  "test-time-compute": "Test-time Compute Scaling: More Compute at Inference",
  "prm-orm": "Process Reward Models (PRM) vs Outcome Reward Models (ORM)",
  "self-verification": "Self-verification and Self-correction in LLMs",
  "magistral": "Magistral (Mistral): Multilingual Reasoning",
  "mcts-reasoning": "MCTS (Monte Carlo Tree Search) for LLM Reasoning",
  "rlvr": "Reward Modeling and RLVR (RL with Verifiable Rewards)",
  "sai": "SAI: Superhuman Adaptable Intelligence (LeCun, 2026)",
  "leworldmodel": "LeWorldModel: Stable JEPA from Pixels",

  // Module: Security & Interpretability
  "adversarial-attacks": "Adversarial Attacks: FGSM, PGD and Model Robustness",
  "prompt-injection": "Prompt Injection: Direct Attacks, Indirect Attacks and Jailbreaking",
  "interpretability": "Interpretability and Explainability (XAI): SHAP, LIME, Mechanistic Interpretability",
  "ai-safety-alignment": "AI Safety and Alignment: Reward Hacking, RLHF, Constitutional AI",

  // ===== Part 3: MLOps & Engineering =====

  // Module: Infrastructure & Compute
  "gpu-architecture": "GPU: Architecture, CUDA Cores, Tensor Cores, HBM",
  "nvidia-gpus": "NVIDIA H100, B200, GB200: Specifications and Comparison",
  "tpu": "TPU (Google): Architecture and Use Cases",
  "custom-chips": "Specialized Accelerators: Groq (LPU), Cerebras (WSE), Graphcore",
  "cuda-ecosystem": "CUDA, cuDNN, NCCL: The NVIDIA Software Ecosystem",
  "cloud-ai": "Cloud AI: AWS SageMaker vs GCP Vertex AI vs Azure ML",
  "cluster-management": "Cluster Management: Slurm, Kubernetes, Ray",
  "networking": "Networking for Distributed Training: InfiniBand, NVLink, NVSwitch",
  "advanced-parallelism": "Advanced Parallelism: Expert Parallelism, 3D Parallelism, Ulysses",

  // Module: MLOps Pipeline
  "experiment-tracking": "Experiment Tracking: MLflow, Weights & Biases, Neptune",
  "data-versioning": "Data Versioning: DVC, LakeFS",
  "model-registry": "Model Registry and Versioning: MLflow, Hugging Face Hub",
  "ci-cd-ml": "CI/CD for ML: Tests, Validation, Automated Deployment",
  "feature-stores": "Feature Stores: Feast, Tecton",
  "monitoring-drift": "Monitoring: Data Drift, Concept Drift, Performance Degradation",
  "ab-testing-ml": "A/B Testing and Canary Deployments for Models",

  // Module: LLMOps
  "prompt-management": "Prompt Management and Versioning (LangSmith, Humanloop)",
  "llm-eval-benchmarks": "LLM Evaluation: Automated Benchmarks",
  "llm-as-judge": "LLM-as-Judge: Using an LLM to Evaluate an LLM",
  "guardrails": "Guardrails: Content Filtering, Input/Output Validation",
  "safety-redteaming": "Safety: Jailbreak Prevention, Red Teaming",
  "cost-optimization": "Cost Optimization: Prompt Caching, Semantic Caching, Model Routing",
  "llm-observability": "LLM Observability: LangSmith, Arize, Phoenix, Langfuse",
  "gateway-loadbalancing": "Gateway and Load Balancing: LiteLLM, Portkey",

  // Module: Data Engineering for AI
  "data-pipelines": "Large-scale Data Pipelines (Spark, Dask, Ray Data)",
  "web-scraping": "Web Scraping & Data Collection for ML Datasets",
  "data-dedup": "Data Cleaning, Deduplication (MinHash, Exact Dedup)",
  "annotation-tools": "Annotation: Label Studio, Prodigy, Argilla",
  "rlhf-annotation": "RLHF Annotation: Tools and Pipelines",
  "synthetic-data": "Synthetic Data Generation: Techniques and Quality",
  "data-governance": "Data Governance: GDPR, European AI Act, Compliance",
  "dataloaders": "Dataloaders & Data Pipelines for Training",

  // ===== Part 4: Specialized Domains =====

  // Module: Robotics & Embodied AI
  "robotics-overview": "Foundation Models for Robotics: Overview",
  "rt2": "RT-2 (Google): Vision-Language-Action",
  "octo-openvla": "Octo and OpenVLA: Open-source Robotic Manipulation",
  "sim-to-real": "Simulation-to-Real Transfer: Isaac Sim, MuJoCo, Habitat",
  "vla-models": "Vision-Language-Action (VLA) Models: Architecture",
  "manipulation": "Robotic Manipulation: Grasping, Dexterous Manipulation",
  "locomotion": "Locomotion and Autonomous Navigation",
  "humanoid-robots": "Humanoid Robots: Tesla Optimus, Figure 01/02, 1X Neo",
  "rl-robotics": "Reinforcement Learning for Robotics: PPO, SAC, TD3",
  "world-models": "World Models for Robotics and Planning",

  // Module: AI for Healthcare / Medical
  "medical-llms": "Medical LLMs: Med-PaLM 2, BioGPT, PMC-LLaMA",
  "medical-imaging": "Medical Imaging: Radiology AI (Detection, Segmentation)",
  "pathology-ai": "Pathology AI: Histological Slide Analysis",
  "drug-discovery": "Drug Discovery: AlphaFold 3 and Protein Structure",
  "drug-design-diffusion": "Diffusion Models for Drug Design: Molecules and Proteins",
  "clinical-nlp": "Clinical NLP: Information Extraction, Record Summarization, CDS",
  "federated-learning": "Federated Learning: Training on Distributed Data",
  "medical-regulation": "Regulation: FDA, CE Marking, SaMD, AI Act for Medical",

  // Module: AI for Science
  "alphafold": "AlphaFold 1/2/3: Protein Folding",
  "weather-climate": "Weather & Climate: GraphCast, GenCast",
  "materials-discovery": "Materials Discovery: GNoME (Google)",
  "math-reasoning": "Mathematical Reasoning: AlphaGeometry, AlphaProof",
  "scientific-llms": "Scientific LLMs: Galactica, SciBERT, Domain-specific Models",
  "ai-physics": "AI for Physics: Simulations, Particle Accelerators",
  "ai-chemistry": "AI for Chemistry: Retrosynthesis, Molecular Generation",

  // ===== Part 5: Mistral AI =====

  // Module: Overview & Strategy
  "mistral-history": "History of Mistral AI: Founding, Founders, Vision",
  "mistral-open-source": "Open-weight vs Proprietary Strategy: Why and How",
  "mistral-sovereignty": "European Positioning & Digital Sovereignty",
  "mistral-funding": "Fundraising, Valuation, Investors",

  // Module: Mistral Models
  "mistral-7b": "Mistral 7B: The First Model, Architecture and Impact",
  "mixtral-8x7b": "Mixtral 8x7B: First Major Open-source MoE",
  "mixtral-8x22b": "Mixtral 8x22B: Scaling MoE",
  "mistral-large-3": "Mistral Large 3: The Flagship Frontier",
  "mistral-medium-3": "Mistral Medium 3: Cost/Performance Balance",
  "mistral-small-4": "Mistral Small 4: Efficiency and Speed",
  "ministral": "Ministral 3B / 8B / 14B: Edge Models",
  "pixtral-12b": "Pixtral 12B: Multimodal Vision + Text",
  "mistral-nemo": "Mistral NeMo 12B: Multilingual Open-source (NVIDIA Collab)",
  "codestral": "Codestral: Code Specialist",
  "devstral": "Devstral 2 & Devstral Small 2: Next-gen Coding",
  "leanstral": "Leanstral: Formal Proofs for Verifiable Code",
  "magistral-model": "Magistral (v1.2): Multilingual Reasoning",
  "mistral-embed": "Mistral Embed: Embeddings for Semantic Search",
  "mistral-models-comparison": "Mistral Models Comparison: When to Use Which?",

  // Module: Mistral Engineering
  "mistral-moe": "MoE Architecture at Mistral: Sparse Routing, 8 Expert Groups",
  "mistral-swa": "Sliding Window Attention: Mistral Implementation",
  "mistral-tokenization": "Mistral Tokenization: 32K Vocabulary, Choices and Trade-offs",
  "mistral-training-infra": "Training Infrastructure: NVIDIA Hopper, HBM3e, Scaling",
  "mistral-context-windows": "Context Window Evolution: 32K -> 128K -> 256K",
  "mistral-release-process": "Open-weight Release Process: Licenses, Hugging Face, GGUF",

  // Module: Products & Platform
  "la-plateforme": "La Plateforme: API, Models, Free Tier",
  "le-chat": "Le Chat: Free / Pro / Enterprise",
  "mistral-studio": "Mistral AI Studio: Enterprise Production Platform",
  "mistral-forge": "Mistral Forge: Build-your-own AI Enterprise",
  "mistral-ocr": "Mistral OCR: Document Recognition",
  "mistral-vibe": "Mistral Vibe: AI-assisted Dev CLI",

  // Module: API Capabilities in Detail
  "mistral-function-calling": "Mistral Function Calling: Design Patterns and Examples",
  "mistral-json-mode": "JSON Mode & Structured Output: json_object vs json_schema",
  "mistral-finetuning-api": "Fine-tuning API: Workflow, Datasets, Hyperparameters",
  "mistral-guardrails": "Guardrails & Moderation: safe_prompt, Content Filtering",
  "mistral-batch-api": "Batch API and Cost Optimization",
  "mistral-agents-api": "Agents API and Mistral Workflows",

  // Module: Solutions & Deployment
  "mistral-azure": "Mistral on Azure: Partnership, Azure AI Studio",
  "mistral-aws-gcp": "Mistral on AWS Bedrock and GCP",
  "mistral-compute": "Mistral Compute: Sovereign Infrastructure (France Datacenter)",
  "mistral-dassault": "Dassault Systemes / OUTSCALE Partnership: Sovereign Cloud",
  "mistral-on-premise": "On-premise and Self-hosted Deployment",

  // ===== Part 6: AI Ecosystem =====

  // Module: Major Players
  "comparatif-produits-api": "Product & API Comparison: OpenAI vs Anthropic vs Google vs Mistral (March 2026)",
  "openai": "OpenAI: GPT-4/4o, o1/o3/o4, Sora",
  "google-deepmind": "Google DeepMind: Gemini, Gemma, Fundamental Research",
  "anthropic": "Anthropic: Claude, Constitutional AI, Safety-first",
  "meta-ai": "Meta AI: LLaMA 1/2/3, Open-source Strategy",
  "xai": "xAI: Grok, Architecture, Colossus Cluster",
  "deepseek": "DeepSeek: DeepSeek-V2/V3, R1, Chinese MoE",
  "cohere-ai21": "Cohere & AI21 Labs: Enterprise NLP, Command R, Jamba",
  "hugging-face": "Hugging Face: Open-source Ecosystem, Transformers, Hub, Spaces",
  "nvidia-ecosystem": "NVIDIA: Hardware, Software (CUDA, NIM, TensorRT)",
  "stability-bfl": "Stability AI / Black Forest Labs: Stable Diffusion, Flux",

  // Module: Benchmarks & Evaluation
  "mmlu": "MMLU and MMLU-Pro: General Knowledge",
  "humaneval": "HumanEval and MBPP: Code Evaluation",
  "math-gsm8k": "MATH and GSM8K: Mathematical Reasoning",
  "gpqa": "GPQA: Graduate-level Questions",
  "arc-hellaswag": "ARC, HellaSwag, WinoGrande: Common Sense Reasoning",
  "aime-benchmark": "AIME and Math Competitions: New Standard",
  "lmarena": "LMArena (Chatbot Arena): Human ELO Evaluation",
  "benchmark-limits": "Benchmark Limitations: Contamination, Gaming, Saturation",
  "benchmaxxing": "Benchmaxxing: When Benchmarks Become the Goal",

  // Module: Annotated Foundational Papers
  "paper-transformer": "\"Attention Is All You Need\" (2017)",
  "paper-bert": "\"BERT\" (2018)",
  "paper-gpt3": "\"GPT-3: Language Models are Few-Shot Learners\" (2020)",
  "paper-scaling-laws": "\"Scaling Laws for Neural Language Models\" (2020)",
  "paper-chinchilla": "\"Training Compute-Optimal LLMs\" / Chinchilla (2022)",
  "paper-lora": "\"LoRA\" (2021)",
  "paper-flash-attention": "\"Flash Attention\" (2022)",
  "paper-llama": "\"LLaMA: Open and Efficient Foundation LMs\" (2023)",
  "paper-mamba": "\"Mamba: Linear-Time Sequence Modeling\" (2023)",
  "paper-mixtral": "\"Mixtral of Experts\" (2024)",

  // ===== Part 7: Mathematical Foundations =====

  // Module: Linear Algebra
  "vectors-matrices": "Vectors and Matrices: The Building Blocks",
  "matrix-operations": "Matrix Operations: Multiplication, Transpose, Inverse",
  "eigenvalues": "Eigenvalues and Eigenvectors",
  "svd": "Singular Value Decomposition (SVD)",
  "vector-spaces": "Vector Spaces, Bases, and Projections",
  "norms-distances": "Norms and Distances: L1, L2, Cosine",

  // Module: Differential and Integral Calculus
  "derivatives": "Derivatives and Gradients: The Geometric Intuition",
  "chain-rule": "The Chain Rule: The Heart of Backpropagation",
  "partial-derivatives": "Partial Derivatives and the Jacobian",
  "taylor-series": "Taylor Series and Approximations",
  "integrals-ml": "Integrals in ML: Marginalization and Expectation",

  // Module: Probability and Statistics
  "probability-basics": "Probability: Axioms, Conditional, Bayes",
  "distributions": "Distributions: Gaussian, Bernoulli, Categorical, Softmax",
  "expectation-variance": "Expectation, Variance, and Moments",
  "maximum-likelihood": "Maximum Likelihood Estimation (MLE) and MAP",
  "sampling": "Sampling: Monte Carlo, Importance Sampling, MCMC",

  // Module: Optimization
  "convexity": "Convexity: Convex Functions, Local vs Global Minima",
  "gradient-methods": "Gradient Methods: Convergence, Learning Rate, Momentum",
  "lagrange-constraints": "Constrained Optimization: Lagrange and KKT",
  "numerical-stability": "Numerical Stability: Overflow, Underflow, Log-Sum-Exp",

  // Module: Information Theory
  "entropy": "Entropy: Measuring Uncertainty",
  "kl-divergence": "KL Divergence and Cross-Entropy",
  "mutual-information": "Mutual Information and Its Applications in ML",
  "game-theory": "Game Theory",

  // ===== Part 8: Resources & Glossary =====

  // Module: Resources
  "glossary": "AI Glossary: 200+ Terms Defined (A-Z)",
  "frameworks-pytorch": "Tools & Frameworks: PyTorch, JAX, Hugging Face Transformers",
  "frameworks-llm": "LLM Frameworks: LangChain, LlamaIndex, Haystack, DSPy",
  "datasets": "Reference Datasets: Pre-training, Fine-tuning, Evaluation",
  "youtube-channels": "Recommended YouTube Channels",
  "podcasts-newsletters": "Podcasts & Newsletters",
  "certifications": "Certifications and Complementary Learning Paths",
  "communities": "Communities: r/LocalLLaMA, Hugging Face Discord, EleutherAI",
  "glossaire-it": "IT Glossary: Computer Science Terminology for AI",
};
