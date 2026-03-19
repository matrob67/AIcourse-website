export interface Lesson {
  id: string;
  number: number;
  title: string;
  slug: string;
  arxiv?: string[];
  links?: { label: string; url: string }[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Part {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  modules: Module[];
}

export const courseParts: Part[] = [
  // ═══════════════════════════════════════════════════════════
  // PARTIE 1 : FONDAMENTAUX
  // ═══════════════════════════════════════════════════════════
  {
    id: "fondamentaux",
    title: "Fondamentaux",
    shortTitle: "Fondamentaux",
    description: "De 0 à compétent — Les bases du ML, Deep Learning, NLP et LLM",
    icon: "📐",
    modules: [
      {
        id: "ml-bases",
        title: "Machine Learning — Les bases",
        lessons: [
          { id: "ml-overview", number: 1, title: "Qu'est-ce que le Machine Learning ? Vue d'ensemble", slug: "ml-overview" },
          { id: "supervised-learning", number: 2, title: "Apprentissage supervisé : classification vs régression", slug: "supervised-learning" },
          { id: "unsupervised-learning", number: 3, title: "Apprentissage non-supervisé : clustering, réduction de dimension", slug: "unsupervised-learning" },
          { id: "reinforcement-learning-basics", number: 4, title: "Apprentissage par renforcement : principes fondamentaux", slug: "reinforcement-learning-basics" },
          { id: "perceptron", number: 5, title: "Le perceptron et les réseaux de neurones simples", slug: "perceptron" },
          { id: "backpropagation", number: 6, title: "Backpropagation : comment un réseau apprend", slug: "backpropagation" },
          { id: "gradient-descent", number: 7, title: "Gradient descent : SGD, momentum, Nesterov", slug: "gradient-descent" },
          { id: "optimizers", number: 8, title: "Optimizers modernes : Adam, AdamW, LAMB", slug: "optimizers", arxiv: ["1412.6980", "1711.05101"] },
          { id: "loss-functions", number: 9, title: "Loss functions : cross-entropy, MSE, contrastive loss", slug: "loss-functions" },
          { id: "overfitting", number: 10, title: "Overfitting et underfitting : diagnostic et solutions", slug: "overfitting" },
          { id: "regularization", number: 11, title: "Régularisation : L1, L2, dropout, early stopping", slug: "regularization" },
          { id: "normalization", number: 12, title: "Batch normalization et Layer normalization", slug: "normalization", arxiv: ["1502.03167", "1607.06450"] },
          { id: "metrics-basics", number: 13, title: "Métriques d'évaluation : accuracy, precision, recall, F1", slug: "metrics-basics" },
          { id: "metrics-advanced", number: 14, title: "Métriques avancées : AUC-ROC, confusion matrix, calibration", slug: "metrics-advanced" },
          { id: "data-splitting", number: 15, title: "Train/validation/test split, cross-validation, data leakage", slug: "data-splitting" },
        ],
      },
      {
        id: "deep-learning",
        title: "Deep Learning — Architectures fondamentales",
        lessons: [
          { id: "cnn", number: 16, title: "Convolutional Neural Networks (CNN) : convolutions, pooling, feature maps", slug: "cnn" },
          { id: "cnn-architectures", number: 17, title: "Architectures CNN classiques : LeNet, AlexNet, VGG, ResNet", slug: "cnn-architectures", arxiv: ["1512.03385"] },
          { id: "transfer-learning-vision", number: 18, title: "Transfer learning en vision : fine-tuning de modèles pré-entraînés", slug: "transfer-learning-vision" },
          { id: "rnn", number: 19, title: "Recurrent Neural Networks (RNN) : séquences et mémoire", slug: "rnn" },
          { id: "lstm-gru", number: 20, title: "LSTM et GRU : résoudre le vanishing gradient", slug: "lstm-gru" },
          { id: "seq2seq-attention", number: 21, title: "Seq2Seq et le mécanisme d'attention (Bahdanau)", slug: "seq2seq-attention", arxiv: ["1409.0473"] },
          { id: "autoencoders", number: 22, title: "Autoencoders : compression et reconstruction", slug: "autoencoders" },
          { id: "vae", number: 23, title: "Variational Autoencoders (VAE)", slug: "vae", arxiv: ["1312.6114"] },
          { id: "gan", number: 24, title: "Generative Adversarial Networks (GAN)", slug: "gan", arxiv: ["1406.2661"] },
          { id: "gan-advanced", number: 25, title: "Architectures GAN avancées : StyleGAN, CycleGAN, WGAN", slug: "gan-advanced" },
          { id: "diffusion-models-basics", number: 26, title: "Diffusion Models : principes fondamentaux", slug: "diffusion-models-basics", arxiv: ["2006.11239"] },
          { id: "score-based-flow", number: 27, title: "Score-based generative models et flow matching", slug: "score-based-flow" },
        ],
      },
      {
        id: "transformer",
        title: "Le Transformer — L'architecture qui a tout changé",
        lessons: [
          { id: "transformer-overview", number: 28, title: "Attention Is All You Need : vue d'ensemble", slug: "transformer-overview", arxiv: ["1706.03762"] },
          { id: "self-attention", number: 29, title: "Self-attention : query, key, value en détail", slug: "self-attention" },
          { id: "multi-head-attention", number: 30, title: "Multi-head attention : pourquoi et comment", slug: "multi-head-attention" },
          { id: "positional-encoding", number: 31, title: "Positional encoding : sinusoïdal vs appris vs RoPE", slug: "positional-encoding", arxiv: ["2104.09864"] },
          { id: "encoder-decoder", number: 32, title: "Architecture encoder-decoder complète", slug: "encoder-decoder" },
          { id: "ffn-residual", number: 33, title: "Feed-forward networks et residual connections", slug: "ffn-residual" },
          { id: "pre-post-norm", number: 34, title: "Pre-norm vs post-norm : impact sur le training", slug: "pre-post-norm" },
          { id: "transformer-vs-rnn", number: 35, title: "Pourquoi le Transformer a remplacé les RNN", slug: "transformer-vs-rnn" },
        ],
      },
      {
        id: "nlp",
        title: "NLP — Du classique au moderne",
        lessons: [
          { id: "tokenization-bpe", number: 36, title: "Tokenization : BPE (Byte Pair Encoding)", slug: "tokenization-bpe" },
          { id: "tokenization-other", number: 37, title: "Tokenization : WordPiece, SentencePiece, Unigram", slug: "tokenization-other" },
          { id: "word2vec", number: 38, title: "Word embeddings : Word2Vec (CBOW, Skip-gram)", slug: "word2vec", arxiv: ["1301.3781"] },
          { id: "glove-fasttext", number: 39, title: "GloVe et FastText : embeddings contextuels vs statiques", slug: "glove-fasttext" },
          { id: "bert", number: 40, title: "BERT : pre-training bidirectionnel, MLM, NSP", slug: "bert", arxiv: ["1810.04805"] },
          { id: "bert-variants", number: 41, title: "Variantes de BERT : RoBERTa, ALBERT, DeBERTa, DistilBERT", slug: "bert-variants" },
          { id: "gpt", number: 42, title: "GPT : auto-regressive language modeling", slug: "gpt", arxiv: ["2005.14165"] },
          { id: "t5", number: 43, title: "T5 : Text-to-Text Transfer Transformer", slug: "t5", arxiv: ["1910.10683"] },
          { id: "bart", number: 44, title: "BART et les modèles encoder-decoder pour la génération", slug: "bart" },
          { id: "sentence-embeddings", number: 45, title: "Sentence embeddings et similarity : SBERT", slug: "sentence-embeddings", arxiv: ["1908.10084"] },
        ],
      },
      {
        id: "llm-basics",
        title: "LLM — Comprendre les Large Language Models",
        lessons: [
          { id: "llm-overview", number: 46, title: "Qu'est-ce qu'un LLM ? Définition, échelle, capacités émergentes", slug: "llm-overview" },
          { id: "scaling-laws-kaplan", number: 47, title: "Scaling laws : les lois de Kaplan", slug: "scaling-laws-kaplan", arxiv: ["2001.08361"] },
          { id: "chinchilla", number: 48, title: "Chinchilla et les lois de scaling optimales", slug: "chinchilla", arxiv: ["2203.15556"] },
          { id: "pretraining", number: 49, title: "Pré-entraînement : données, objectifs (CLM, MLM, span corruption)", slug: "pretraining" },
          { id: "pretraining-datasets", number: 50, title: "Les datasets de pré-entraînement : Common Crawl, The Pile, RedPajama, FineWeb", slug: "pretraining-datasets" },
          { id: "finetuning-overview", number: 51, title: "Full fine-tuning vs parameter-efficient fine-tuning", slug: "finetuning-overview" },
          { id: "rlhf", number: 52, title: "RLHF : Reinforcement Learning from Human Feedback", slug: "rlhf", arxiv: ["2203.02155"] },
          { id: "dpo", number: 53, title: "DPO : Direct Preference Optimization", slug: "dpo", arxiv: ["2305.18290"] },
          { id: "constitutional-ai", number: 54, title: "Constitutional AI", slug: "constitutional-ai", arxiv: ["2212.08073"] },
          { id: "orpo-kto", number: 55, title: "ORPO, KTO et les alternatives à RLHF/DPO", slug: "orpo-kto" },
          { id: "emergent-abilities", number: 56, title: "Emergent abilities et phase transitions dans les LLM", slug: "emergent-abilities" },
          { id: "in-context-learning", number: 57, title: "In-context learning : comment ça marche ?", slug: "in-context-learning" },
          { id: "prompt-engineering", number: 58, title: "Prompt engineering : zero-shot, few-shot, system prompts", slug: "prompt-engineering" },
          { id: "chain-of-thought", number: 59, title: "Chain-of-thought prompting", slug: "chain-of-thought", arxiv: ["2201.11903"] },
          { id: "structured-output", number: 60, title: "Structured output : JSON mode, function calling, grammars", slug: "structured-output" },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PARTIE 2 : STATE OF THE ART
  // ═══════════════════════════════════════════════════════════
  {
    id: "state-of-the-art",
    title: "State of the Art",
    shortTitle: "SOTA",
    description: "Techniques avancées — Architectures, training, inférence, RAG, agents",
    icon: "🔬",
    modules: [
      {
        id: "post-transformer",
        title: "Architectures post-Transformer",
        lessons: [
          { id: "moe-principles", number: 61, title: "Mixture of Experts (MoE) : principes, routing, sparse gating", slug: "moe-principles", arxiv: ["2101.03961"] },
          { id: "moe-practice", number: 62, title: "MoE en pratique : Mixtral, DeepSeek-MoE, Grok", slug: "moe-practice", arxiv: ["2401.04088"] },
          { id: "expert-routing", number: 63, title: "Expert choice routing vs token choice routing", slug: "expert-routing" },
          { id: "s4", number: 64, title: "State Space Models : S4", slug: "s4", arxiv: ["2111.00396"] },
          { id: "mamba", number: 65, title: "Mamba : selective state spaces", slug: "mamba", arxiv: ["2312.00752"] },
          { id: "mamba2-jamba", number: 66, title: "Mamba-2 et Jamba : hybrides SSM + Attention", slug: "mamba2-jamba", arxiv: ["2405.21060"] },
          { id: "rwkv", number: 67, title: "RWKV : RNN linéaire à l'échelle des Transformers", slug: "rwkv", arxiv: ["2305.13048"] },
          { id: "retnet", number: 68, title: "RetNet (Retention Networks)", slug: "retnet", arxiv: ["2307.08621"] },
          { id: "hyena", number: 69, title: "Hyena et les convolutions longues", slug: "hyena", arxiv: ["2302.10866"] },
          { id: "hybrid-architectures", number: 70, title: "Architectures hybrides : le meilleur des deux mondes", slug: "hybrid-architectures" },
        ],
      },
      {
        id: "attention-advanced",
        title: "Mécanismes d'attention avancés",
        lessons: [
          { id: "mqa", number: 71, title: "Multi-Query Attention (MQA)", slug: "mqa", arxiv: ["1911.02150"] },
          { id: "gqa", number: 72, title: "Grouped Query Attention (GQA)", slug: "gqa", arxiv: ["2305.13245"] },
          { id: "flash-attention", number: 73, title: "Flash Attention : algorithme et impact", slug: "flash-attention", arxiv: ["2205.14135"] },
          { id: "flash-attention-2", number: 74, title: "Flash Attention 2", slug: "flash-attention-2", arxiv: ["2307.08691"] },
          { id: "flash-attention-3", number: 75, title: "Flash Attention 3 et les optimisations matérielles", slug: "flash-attention-3" },
          { id: "sliding-window-attention", number: 76, title: "Sliding Window Attention (Mistral)", slug: "sliding-window-attention" },
          { id: "ring-attention", number: 77, title: "Ring Attention : contextes ultra-longs", slug: "ring-attention", arxiv: ["2310.01889"] },
          { id: "sparse-attention", number: 78, title: "Sparse attention patterns : Longformer, BigBird", slug: "sparse-attention" },
          { id: "linear-attention", number: 79, title: "Linear attention et alternatives sub-quadratiques", slug: "linear-attention" },
          { id: "kv-cache", number: 80, title: "KV Cache : fonctionnement, compression, quantification", slug: "kv-cache" },
          { id: "rope", number: 81, title: "RoPE (Rotary Position Embedding) en détail", slug: "rope", arxiv: ["2104.09864"] },
          { id: "alibi", number: 82, title: "ALiBi et les alternatives à RoPE", slug: "alibi", arxiv: ["2108.12409"] },
          { id: "context-extension", number: 83, title: "Context window extension : YaRN, NTK-aware scaling", slug: "context-extension" },
        ],
      },
      {
        id: "training-modern",
        title: "Training — Techniques d'entraînement modernes",
        lessons: [
          { id: "mixed-precision", number: 84, title: "Mixed precision training : FP16, BF16", slug: "mixed-precision", arxiv: ["1710.03740"] },
          { id: "fp8-training", number: 85, title: "FP8 training et quantization-aware training", slug: "fp8-training" },
          { id: "data-parallelism", number: 86, title: "Data Parallelism (DP) et Distributed Data Parallel (DDP)", slug: "data-parallelism" },
          { id: "tensor-parallelism", number: 87, title: "Tensor Parallelism : couper les matrices", slug: "tensor-parallelism" },
          { id: "pipeline-parallelism", number: 88, title: "Pipeline Parallelism : couper les couches", slug: "pipeline-parallelism" },
          { id: "sequence-parallelism", number: 89, title: "Sequence Parallelism et Context Parallelism", slug: "sequence-parallelism" },
          { id: "zero", number: 90, title: "ZeRO : stage 1, 2, 3 (DeepSpeed)", slug: "zero", arxiv: ["1910.02054"] },
          { id: "fsdp", number: 91, title: "FSDP (Fully Sharded Data Parallelism) - PyTorch natif", slug: "fsdp" },
          { id: "megatron-lm", number: 92, title: "Megatron-LM : training massif chez NVIDIA", slug: "megatron-lm" },
          { id: "gradient-checkpointing", number: 93, title: "Gradient checkpointing / activation recomputation", slug: "gradient-checkpointing" },
          { id: "gradient-accumulation", number: 94, title: "Gradient accumulation et effective batch size", slug: "gradient-accumulation" },
          { id: "lr-scheduling", number: 95, title: "Learning rate scheduling : warmup, cosine, WSD", slug: "lr-scheduling" },
          { id: "curriculum-learning", number: 96, title: "Curriculum learning et data ordering", slug: "curriculum-learning" },
          { id: "data-quality", number: 97, title: "Data quality : deduplication, filtering, toxicity removal", slug: "data-quality" },
          { id: "synthetic-data-training", number: 98, title: "Données synthétiques pour le training : techniques et risques", slug: "synthetic-data-training" },
          { id: "continual-pretraining", number: 99, title: "Continual pre-training et domain adaptation", slug: "continual-pretraining" },
          { id: "scaling-infra", number: 100, title: "Scaling infrastructure : networking (InfiniBand, NVLink), storage", slug: "scaling-infra" },
        ],
      },
      {
        id: "peft",
        title: "Fine-tuning efficient (PEFT)",
        lessons: [
          { id: "lora", number: 101, title: "LoRA (Low-Rank Adaptation) en détail", slug: "lora", arxiv: ["2106.09685"] },
          { id: "qlora", number: 102, title: "QLoRA : fine-tuning 4-bit", slug: "qlora", arxiv: ["2305.14314"] },
          { id: "dora", number: 103, title: "DoRA : Weight-Decomposed Low-Rank Adaptation", slug: "dora", arxiv: ["2402.09353"] },
          { id: "adapters", number: 104, title: "Adapters : modules additifs", slug: "adapters", arxiv: ["1902.00751"] },
          { id: "prefix-tuning", number: 105, title: "Prefix tuning", slug: "prefix-tuning", arxiv: ["2101.00190"] },
          { id: "prompt-tuning", number: 106, title: "Prompt tuning et soft prompts", slug: "prompt-tuning", arxiv: ["2104.08691"] },
          { id: "ia3", number: 107, title: "IA3 (Infused Adapter by Inhibiting and Amplifying Inner Activations)", slug: "ia3", arxiv: ["2205.05638"] },
          { id: "peft-comparison", number: 108, title: "PEFT : comparatif des méthodes, quand utiliser quoi", slug: "peft-comparison" },
          { id: "instruction-tuning", number: 109, title: "Instruction tuning : FLAN, Alpaca, OpenHermes, Orca", slug: "instruction-tuning" },
          { id: "rlhf-practice", number: 110, title: "RLHF en pratique : outils (TRL, OpenRLHF)", slug: "rlhf-practice" },
          { id: "dpo-practice", number: 111, title: "DPO en pratique : datasets, hyperparamètres", slug: "dpo-practice" },
          { id: "model-merging-ties", number: 112, title: "Model merging : TIES", slug: "model-merging-ties", arxiv: ["2306.01708"] },
          { id: "model-merging-dare", number: 113, title: "Model merging : DARE, model soups, SLERP", slug: "model-merging-dare", arxiv: ["2311.03099"] },
          { id: "eval-post-finetuning", number: 114, title: "Evaluation post fine-tuning : benchmarks et human eval", slug: "eval-post-finetuning" },
        ],
      },
      {
        id: "inference",
        title: "Inférence & Optimisation",
        lessons: [
          { id: "quantization-concepts", number: 115, title: "Quantization : concepts (INT8, INT4, FP4, NF4)", slug: "quantization-concepts" },
          { id: "gptq", number: 116, title: "GPTQ : quantization post-training", slug: "gptq", arxiv: ["2210.17323"] },
          { id: "awq", number: 117, title: "AWQ (Activation-aware Weight Quantization)", slug: "awq", arxiv: ["2306.00978"] },
          { id: "gguf-llamacpp", number: 118, title: "GGUF et llama.cpp : quantization pour CPU/edge", slug: "gguf-llamacpp" },
          { id: "squeezellm", number: 119, title: "SqueezeLLM et autres techniques récentes", slug: "squeezellm" },
          { id: "speculative-decoding", number: 120, title: "Speculative decoding : draft model + verification", slug: "speculative-decoding", arxiv: ["2302.01318"] },
          { id: "medusa", number: 121, title: "Medusa : multi-head speculative decoding", slug: "medusa", arxiv: ["2401.10774"] },
          { id: "batching", number: 122, title: "Continuous batching et dynamic batching", slug: "batching" },
          { id: "paged-attention", number: 123, title: "PagedAttention et vLLM", slug: "paged-attention", arxiv: ["2309.06180"] },
          { id: "tensorrt-llm", number: 124, title: "TensorRT-LLM : compilation et optimisation NVIDIA", slug: "tensorrt-llm" },
          { id: "onnx-runtime", number: 125, title: "ONNX Runtime et les runtimes cross-platform", slug: "onnx-runtime" },
          { id: "distillation", number: 126, title: "Distillation de modèles : teacher-student", slug: "distillation", arxiv: ["1503.02531"] },
          { id: "pruning", number: 127, title: "Pruning : structured vs unstructured, magnitude, Wanda", slug: "pruning", arxiv: ["2306.11695"] },
          { id: "serving-frameworks", number: 128, title: "Serving frameworks comparés : vLLM, TGI, Triton, SGLang", slug: "serving-frameworks" },
          { id: "ollama-local", number: 129, title: "Ollama et llama.cpp : inférence locale", slug: "ollama-local" },
          { id: "memory-optimization", number: 130, title: "Optimisation mémoire : activation offloading, tensor offloading", slug: "memory-optimization" },
        ],
      },
      {
        id: "rag",
        title: "Retrieval Augmented Generation (RAG)",
        lessons: [
          { id: "rag-overview", number: 131, title: "RAG : principe et architecture", slug: "rag-overview", arxiv: ["2005.11401"] },
          { id: "text-embeddings", number: 132, title: "Text embeddings : modèles et choix", slug: "text-embeddings" },
          { id: "vector-databases", number: 133, title: "Vector databases : Pinecone, Weaviate, Milvus, Chroma, Qdrant", slug: "vector-databases" },
          { id: "chunking", number: 134, title: "Chunking strategies : fixed, semantic, recursive, document-aware", slug: "chunking" },
          { id: "retrieval-methods", number: 135, title: "Dense retrieval vs sparse retrieval (BM25) vs hybrid", slug: "retrieval-methods" },
          { id: "reranking", number: 136, title: "Reranking : cross-encoders et ColBERT", slug: "reranking", arxiv: ["2004.12832"] },
          { id: "advanced-rag", number: 137, title: "Advanced RAG : self-querying, HyDE", slug: "advanced-rag", arxiv: ["2212.10496"] },
          { id: "graph-rag", number: 138, title: "Graph RAG : intégration de knowledge graphs", slug: "graph-rag" },
          { id: "agentic-rag", number: 139, title: "Agentic RAG : routing, multi-step retrieval", slug: "agentic-rag" },
          { id: "rag-evaluation", number: 140, title: "RAG evaluation : RAGAS, faithfulness, context relevance", slug: "rag-evaluation" },
          { id: "long-context-vs-rag", number: 141, title: "Long-context vs RAG : quand utiliser quoi ?", slug: "long-context-vs-rag" },
        ],
      },
      {
        id: "agents",
        title: "Agents & Tool Use",
        lessons: [
          { id: "agents-overview", number: 142, title: "Agents LLM : définition et taxonomie", slug: "agents-overview" },
          { id: "react", number: 143, title: "ReAct pattern : reasoning + acting", slug: "react", arxiv: ["2210.03629"] },
          { id: "function-calling", number: 144, title: "Function calling : design et implémentation", slug: "function-calling" },
          { id: "autogen", number: 145, title: "Multi-agent systems : AutoGen", slug: "autogen", arxiv: ["2308.08155"] },
          { id: "crewai-langgraph", number: 146, title: "CrewAI, LangGraph : orchestration d'agents", slug: "crewai-langgraph" },
          { id: "tree-of-thoughts", number: 147, title: "Planning : Tree of Thoughts", slug: "tree-of-thoughts", arxiv: ["2305.10601"] },
          { id: "graph-of-thoughts", number: 148, title: "Planning : Graph of Thoughts", slug: "graph-of-thoughts", arxiv: ["2308.09687"] },
          { id: "code-agents", number: 149, title: "Code generation agents : Devin, Cursor, Claude Code, Copilot", slug: "code-agents" },
          { id: "agent-memory", number: 150, title: "Memory pour agents : short-term, long-term, episodic, semantic", slug: "agent-memory" },
          { id: "mcp", number: 151, title: "MCP (Model Context Protocol) : standard d'intégration", slug: "mcp" },
          { id: "tool-use-patterns", number: 152, title: "Tool use et API orchestration : patterns avancés", slug: "tool-use-patterns" },
          { id: "agent-evaluation", number: 153, title: "Evaluation d'agents : benchmarks (SWE-bench, WebArena)", slug: "agent-evaluation" },
        ],
      },
      {
        id: "multimodal",
        title: "Multimodal AI",
        lessons: [
          { id: "vlm", number: 154, title: "Vision-Language Models : architecture et training", slug: "vlm", arxiv: ["2304.08485"] },
          { id: "clip", number: 155, title: "CLIP et contrastive learning vision-texte", slug: "clip", arxiv: ["2103.00020"] },
          { id: "vision-models-comparison", number: 156, title: "GPT-4V, Gemini Vision, Claude Vision : comparatif", slug: "vision-models-comparison" },
          { id: "pixtral", number: 157, title: "Pixtral (Mistral) : approche multimodale", slug: "pixtral" },
          { id: "text-to-image", number: 158, title: "Text-to-Image : Stable Diffusion, SDXL, Flux", slug: "text-to-image" },
          { id: "diffusion-models-images", number: 159, title: "Diffusion models pour images : DDPM, DDIM, classifier-free guidance", slug: "diffusion-models-images" },
          { id: "text-to-video", number: 160, title: "Text-to-Video : Sora, Runway Gen-3, Kling, Veo", slug: "text-to-video" },
          { id: "whisper-asr", number: 161, title: "Text-to-Audio : Whisper (ASR)", slug: "whisper-asr", arxiv: ["2212.04356"] },
          { id: "tts", number: 162, title: "Text-to-Speech : Bark, ElevenLabs, XTTS, F5-TTS", slug: "tts" },
          { id: "document-ocr", number: 163, title: "Document understanding & OCR : LayoutLM, Donut, Mistral OCR", slug: "document-ocr" },
          { id: "unified-multimodal", number: 164, title: "Unified multimodal architectures : Gemini, GPT-4o", slug: "unified-multimodal" },
        ],
      },
      {
        id: "reasoning",
        title: "Reasoning Models",
        lessons: [
          { id: "cot-fundamentals", number: 165, title: "Chain-of-thought prompting : fondamentaux", slug: "cot-fundamentals", arxiv: ["2201.11903"] },
          { id: "self-consistency", number: 166, title: "Self-consistency et majority voting", slug: "self-consistency", arxiv: ["2203.11171"] },
          { id: "openai-o1", number: 167, title: "OpenAI o1 : reasoning at inference time", slug: "openai-o1" },
          { id: "openai-o3-o4", number: 168, title: "OpenAI o3/o4-mini : évolution du reasoning", slug: "openai-o3-o4" },
          { id: "deepseek-r1", number: 169, title: "DeepSeek R1 : open-source reasoning", slug: "deepseek-r1", arxiv: ["2501.12948"] },
          { id: "test-time-compute", number: 170, title: "Test-time compute scaling : plus de compute à l'inférence", slug: "test-time-compute" },
          { id: "prm-orm", number: 171, title: "Process Reward Models (PRM) vs Outcome Reward Models (ORM)", slug: "prm-orm", arxiv: ["2305.20050"] },
          { id: "self-verification", number: 172, title: "Self-verification et self-correction dans les LLM", slug: "self-verification" },
          { id: "magistral", number: 173, title: "Magistral (Mistral) : reasoning multilingue", slug: "magistral" },
          { id: "mcts-reasoning", number: 174, title: "MCTS (Monte Carlo Tree Search) pour le reasoning LLM", slug: "mcts-reasoning" },
          { id: "rlvr", number: 175, title: "Reward modeling et RLVR (RL with Verifiable Rewards)", slug: "rlvr" },
        ],
      },
      {
        id: "securite-interpretabilite",
        title: "Securite & Interpretabilite",
        lessons: [
          { id: "adversarial-attacks", number: 176, title: "Attaques adversariales : FGSM, PGD et robustesse des modeles", slug: "adversarial-attacks", arxiv: ["1412.6572", "1706.06083"] },
          { id: "prompt-injection", number: 177, title: "Prompt injection : attaques directes, indirectes et jailbreaking", slug: "prompt-injection" },
          { id: "interpretability", number: 178, title: "Interpretabilite et Explainability (XAI) : SHAP, LIME, mechanistic interpretability", slug: "interpretability", arxiv: ["1705.07874", "1602.04938"] },
          { id: "ai-safety-alignment", number: 179, title: "AI Safety et Alignement : reward hacking, RLHF, Constitutional AI", slug: "ai-safety-alignment", arxiv: ["2212.08073", "2305.18290"] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PARTIE 3 : MLOps & Engineering
  // ═══════════════════════════════════════════════════════════
  {
    id: "mlops",
    title: "MLOps & Engineering",
    shortTitle: "MLOps",
    description: "Infrastructure, pipelines, LLMOps et data engineering",
    icon: "⚙️",
    modules: [
      {
        id: "infrastructure",
        title: "Infrastructure & Compute",
        lessons: [
          { id: "gpu-architecture", number: 176, title: "GPU : architecture, CUDA cores, tensor cores, HBM", slug: "gpu-architecture" },
          { id: "nvidia-gpus", number: 177, title: "NVIDIA H100, B200, GB200 : spécifications et comparaison", slug: "nvidia-gpus" },
          { id: "tpu", number: 178, title: "TPU (Google) : architecture et cas d'usage", slug: "tpu" },
          { id: "custom-chips", number: 179, title: "Accélérateurs spécialisés : Groq (LPU), Cerebras (WSE), Graphcore", slug: "custom-chips" },
          { id: "cuda-ecosystem", number: 180, title: "CUDA, cuDNN, NCCL : l'écosystème logiciel NVIDIA", slug: "cuda-ecosystem" },
          { id: "cloud-ai", number: 181, title: "Cloud AI : AWS SageMaker vs GCP Vertex AI vs Azure ML", slug: "cloud-ai" },
          { id: "cluster-management", number: 182, title: "Cluster management : Slurm, Kubernetes, Ray", slug: "cluster-management" },
          { id: "networking", number: 183, title: "Networking pour distributed training : InfiniBand, NVLink, NVSwitch", slug: "networking" },
        ],
      },
      {
        id: "mlops-pipeline",
        title: "MLOps Pipeline",
        lessons: [
          { id: "experiment-tracking", number: 184, title: "Experiment tracking : MLflow, Weights & Biases, Neptune", slug: "experiment-tracking" },
          { id: "data-versioning", number: 185, title: "Data versioning : DVC, LakeFS", slug: "data-versioning" },
          { id: "model-registry", number: 186, title: "Model registry et versioning : MLflow, Hugging Face Hub", slug: "model-registry" },
          { id: "ci-cd-ml", number: 187, title: "CI/CD pour ML : tests, validation, déploiement automatisé", slug: "ci-cd-ml" },
          { id: "feature-stores", number: 188, title: "Feature stores : Feast, Tecton", slug: "feature-stores" },
          { id: "monitoring-drift", number: 189, title: "Monitoring : data drift, concept drift, performance degradation", slug: "monitoring-drift" },
          { id: "ab-testing-ml", number: 190, title: "A/B testing et canary deployments pour modèles", slug: "ab-testing-ml" },
        ],
      },
      {
        id: "llmops",
        title: "LLMOps",
        lessons: [
          { id: "prompt-management", number: 191, title: "Prompt management et versioning (LangSmith, Humanloop)", slug: "prompt-management" },
          { id: "llm-eval-benchmarks", number: 192, title: "Evaluation de LLM : benchmarks automatiques", slug: "llm-eval-benchmarks" },
          { id: "llm-as-judge", number: 193, title: "LLM-as-judge : utiliser un LLM pour évaluer un LLM", slug: "llm-as-judge" },
          { id: "guardrails", number: 194, title: "Guardrails : content filtering, input/output validation", slug: "guardrails" },
          { id: "safety-redteaming", number: 195, title: "Safety : jailbreak prevention, red teaming", slug: "safety-redteaming" },
          { id: "cost-optimization", number: 196, title: "Cost optimization : prompt caching, semantic caching, model routing", slug: "cost-optimization" },
          { id: "llm-observability", number: 197, title: "Observabilité LLM : LangSmith, Arize, Phoenix, Langfuse", slug: "llm-observability" },
          { id: "gateway-loadbalancing", number: 198, title: "Gateway et load balancing : LiteLLM, Portkey", slug: "gateway-loadbalancing" },
        ],
      },
      {
        id: "data-engineering",
        title: "Data Engineering pour l'IA",
        lessons: [
          { id: "data-pipelines", number: 199, title: "Data pipelines à grande échelle (Spark, Dask, Ray Data)", slug: "data-pipelines" },
          { id: "web-scraping", number: 200, title: "Web scraping & data collection pour datasets ML", slug: "web-scraping" },
          { id: "data-dedup", number: 201, title: "Data cleaning, deduplication (MinHash, exact dedup)", slug: "data-dedup" },
          { id: "annotation-tools", number: 202, title: "Annotation : Label Studio, Prodigy, Argilla", slug: "annotation-tools" },
          { id: "rlhf-annotation", number: 203, title: "Annotation RLHF : outils et pipelines", slug: "rlhf-annotation" },
          { id: "synthetic-data", number: 204, title: "Synthetic data generation : techniques et qualité", slug: "synthetic-data" },
          { id: "data-governance", number: 205, title: "Data governance : GDPR, AI Act européen, compliance", slug: "data-governance" },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PARTIE 4 : DOMAINES SPÉCIALISÉS
  // ═══════════════════════════════════════════════════════════
  {
    id: "domaines",
    title: "Domaines Spécialisés",
    shortTitle: "Domaines",
    description: "Robotics, Medical, AI for Science",
    icon: "🤖",
    modules: [
      {
        id: "robotics",
        title: "Robotics & Embodied AI",
        lessons: [
          { id: "robotics-overview", number: 206, title: "Foundation models pour la robotique : vue d'ensemble", slug: "robotics-overview" },
          { id: "rt2", number: 207, title: "RT-2 (Google) : vision-language-action", slug: "rt2", arxiv: ["2307.15818"] },
          { id: "octo-openvla", number: 208, title: "Octo et OpenVLA : manipulation robotique open-source", slug: "octo-openvla" },
          { id: "sim-to-real", number: 209, title: "Simulation-to-real transfer : Isaac Sim, MuJoCo, Habitat", slug: "sim-to-real" },
          { id: "vla-models", number: 210, title: "Vision-Language-Action (VLA) models : architecture", slug: "vla-models" },
          { id: "manipulation", number: 211, title: "Manipulation robotique : grasping, dexterous manipulation", slug: "manipulation" },
          { id: "locomotion", number: 212, title: "Locomotion et navigation autonome", slug: "locomotion" },
          { id: "humanoid-robots", number: 213, title: "Humanoid robots : Tesla Optimus, Figure 01/02, 1X Neo", slug: "humanoid-robots" },
          { id: "rl-robotics", number: 214, title: "Reinforcement learning pour la robotique : PPO, SAC, TD3", slug: "rl-robotics" },
          { id: "world-models", number: 215, title: "World models pour la robotique et la planification", slug: "world-models" },
        ],
      },
      {
        id: "medical",
        title: "AI for Healthcare / Medical",
        lessons: [
          { id: "medical-llms", number: 216, title: "Medical LLMs : Med-PaLM 2, BioGPT, PMC-LLaMA", slug: "medical-llms" },
          { id: "medical-imaging", number: 217, title: "Medical imaging : radiology AI (détection, segmentation)", slug: "medical-imaging" },
          { id: "pathology-ai", number: 218, title: "Pathology AI : analyse de lames histologiques", slug: "pathology-ai" },
          { id: "drug-discovery", number: 219, title: "Drug discovery : AlphaFold 3 et protein structure", slug: "drug-discovery", arxiv: ["2402.04845"] },
          { id: "drug-design-diffusion", number: 220, title: "Diffusion models pour drug design : molécules et protéines", slug: "drug-design-diffusion" },
          { id: "clinical-nlp", number: 221, title: "Clinical NLP : extraction d'info, résumé de dossiers, CDS", slug: "clinical-nlp" },
          { id: "federated-learning", number: 222, title: "Federated learning : training sur données distribuées", slug: "federated-learning" },
          { id: "medical-regulation", number: 223, title: "Réglementation : FDA, CE marking, SaMD, AI Act pour le médical", slug: "medical-regulation" },
        ],
      },
      {
        id: "ai-science",
        title: "AI for Science",
        lessons: [
          { id: "alphafold", number: 224, title: "AlphaFold 1/2/3 : protein folding", slug: "alphafold" },
          { id: "weather-climate", number: 225, title: "Weather & climate : GraphCast, GenCast", slug: "weather-climate", arxiv: ["2212.12794"] },
          { id: "materials-discovery", number: 226, title: "Materials discovery : GNoME (Google)", slug: "materials-discovery", arxiv: ["2310.01308"] },
          { id: "math-reasoning", number: 227, title: "Mathematical reasoning : AlphaGeometry, AlphaProof", slug: "math-reasoning" },
          { id: "scientific-llms", number: 228, title: "Scientific LLMs : Galactica, SciBERT, domain-specific models", slug: "scientific-llms" },
          { id: "ai-physics", number: 229, title: "AI pour la physique : simulations, accélérateurs de particules", slug: "ai-physics" },
          { id: "ai-chemistry", number: 230, title: "AI pour la chimie : retrosynthesis, molecular generation", slug: "ai-chemistry" },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PARTIE 5 : MISTRAL AI
  // ═══════════════════════════════════════════════════════════
  {
    id: "mistral",
    title: "Mistral AI",
    shortTitle: "Mistral",
    description: "Section dédiée — Modèles, engineering, produits, solutions",
    icon: "🇫🇷",
    modules: [
      {
        id: "mistral-strategy",
        title: "Présentation & Stratégie",
        lessons: [
          { id: "mistral-history", number: 231, title: "Histoire de Mistral AI : fondation, fondateurs, vision", slug: "mistral-history" },
          { id: "mistral-open-source", number: 232, title: "Stratégie open-weight vs propriétaire : pourquoi et comment", slug: "mistral-open-source" },
          { id: "mistral-sovereignty", number: 233, title: "Positionnement européen & souveraineté numérique", slug: "mistral-sovereignty" },
          { id: "mistral-funding", number: 234, title: "Levées de fonds, valorisation, investisseurs", slug: "mistral-funding" },
        ],
      },
      {
        id: "mistral-models",
        title: "Les Modèles Mistral — Catalogue complet",
        lessons: [
          { id: "mistral-7b", number: 235, title: "Mistral 7B : le premier modèle, architecture et impact", slug: "mistral-7b", arxiv: ["2310.06825"], links: [{ label: "Blog", url: "https://mistral.ai/news/announcing-mistral-7b/" }] },
          { id: "mixtral-8x7b", number: 236, title: "Mixtral 8x7B : premier MoE open-source grand public", slug: "mixtral-8x7b", arxiv: ["2401.04088"], links: [{ label: "Blog", url: "https://mistral.ai/news/mixtral-of-experts" }] },
          { id: "mixtral-8x22b", number: 237, title: "Mixtral 8x22B : scaling du MoE", slug: "mixtral-8x22b", links: [{ label: "Blog", url: "https://mistral.ai/news/mixtral-8x22b/" }] },
          { id: "mistral-large-3", number: 238, title: "Mistral Large 3 : le flagship frontier", slug: "mistral-large-3", links: [{ label: "Blog", url: "https://mistral.ai/news/mistral-3" }] },
          { id: "mistral-medium-3", number: 239, title: "Mistral Medium 3 : équilibre coût/performance", slug: "mistral-medium-3", links: [{ label: "Modèles", url: "https://mistral.ai/models" }] },
          { id: "mistral-small-4", number: 240, title: "Mistral Small 4 : efficacité et rapidité", slug: "mistral-small-4", links: [{ label: "Modèles", url: "https://mistral.ai/models" }] },
          { id: "ministral", number: 241, title: "Ministral 3B / 8B / 14B : modèles edge", slug: "ministral", links: [{ label: "Blog", url: "https://mistral.ai/news/mistral-3" }] },
          { id: "pixtral-12b", number: 242, title: "Pixtral 12B : multimodal vision + texte", slug: "pixtral-12b", links: [{ label: "Modèles", url: "https://mistral.ai/models" }] },
          { id: "mistral-nemo", number: 243, title: "Mistral NeMo 12B : multilingual open-source (collab NVIDIA)", slug: "mistral-nemo", links: [{ label: "Blog", url: "https://mistral.ai/news/mistral-nemo" }] },
          { id: "codestral", number: 244, title: "Codestral : spécialiste code", slug: "codestral", links: [{ label: "Blog", url: "https://mistral.ai/news/codestral/" }] },
          { id: "devstral", number: 245, title: "Devstral 2 & Devstral Small 2 : coding nouvelle génération", slug: "devstral", links: [{ label: "Blog", url: "https://mistral.ai/news/mistral-3" }] },
          { id: "leanstral", number: 246, title: "Leanstral : preuves formelles pour code vérifiable", slug: "leanstral", links: [{ label: "Blog", url: "https://mistral.ai/news/leanstral" }, { label: "Docs", url: "https://docs.mistral.ai/models/leanstral-26-03" }] },
          { id: "magistral-model", number: 247, title: "Magistral (v1.2) : reasoning multilingue", slug: "magistral-model", arxiv: ["2506.10910"], links: [{ label: "Blog", url: "https://mistral.ai/news/magistral" }] },
          { id: "mistral-embed", number: 247, title: "Mistral Embed : embeddings pour recherche sémantique", slug: "mistral-embed", links: [{ label: "Docs", url: "https://docs.mistral.ai/capabilities/embeddings/" }] },
          { id: "mistral-models-comparison", number: 248, title: "Comparaison des modèles Mistral : quand utiliser lequel ?", slug: "mistral-models-comparison" },
        ],
      },
      {
        id: "mistral-engineering",
        title: "Engineering Mistral",
        lessons: [
          { id: "mistral-moe", number: 249, title: "Architecture MoE chez Mistral : routing sparse, 8 groupes d'experts", slug: "mistral-moe" },
          { id: "mistral-swa", number: 250, title: "Sliding Window Attention : implémentation Mistral", slug: "mistral-swa" },
          { id: "mistral-tokenization", number: 251, title: "Tokenization Mistral : vocabulaire 32K, choix et trade-offs", slug: "mistral-tokenization" },
          { id: "mistral-training-infra", number: 252, title: "Training infrastructure : NVIDIA Hopper, HBM3e, scaling", slug: "mistral-training-infra" },
          { id: "mistral-context-windows", number: 253, title: "Évolution des context windows : 32K → 128K → 256K", slug: "mistral-context-windows" },
          { id: "mistral-release-process", number: 254, title: "Open-weight release process : licences, Hugging Face, GGUF", slug: "mistral-release-process" },
        ],
      },
      {
        id: "mistral-products",
        title: "Produits & Plateforme",
        lessons: [
          { id: "la-plateforme", number: 255, title: "La Plateforme : API, modèles, free tier", slug: "la-plateforme", links: [{ label: "Blog", url: "https://mistral.ai/news/la-plateforme" }, { label: "Docs API", url: "https://docs.mistral.ai/api" }] },
          { id: "le-chat", number: 256, title: "Le Chat : Free / Pro / Enterprise", slug: "le-chat", links: [{ label: "Page produit", url: "https://mistral.ai/products/le-chat" }] },
          { id: "mistral-studio", number: 257, title: "Mistral AI Studio : plateforme enterprise production", slug: "mistral-studio", links: [{ label: "Page", url: "https://mistral.ai/products/studio" }] },
          { id: "mistral-forge", number: 258, title: "Mistral Forge : build-your-own AI enterprise", slug: "mistral-forge" },
          { id: "mistral-ocr", number: 259, title: "Mistral OCR : reconnaissance de documents", slug: "mistral-ocr", links: [{ label: "Blog", url: "https://mistral.ai/news/mistral-ocr" }] },
          { id: "mistral-vibe", number: 260, title: "Mistral Vibe : CLI pour dev assisté par IA", slug: "mistral-vibe" },
        ],
      },
      {
        id: "mistral-api",
        title: "Capabilities API en détail",
        lessons: [
          { id: "mistral-function-calling", number: 261, title: "Function calling Mistral : design patterns et exemples", slug: "mistral-function-calling", links: [{ label: "Docs", url: "https://docs.mistral.ai/capabilities/function_calling" }] },
          { id: "mistral-json-mode", number: 262, title: "JSON mode & Structured output : json_object vs json_schema", slug: "mistral-json-mode", links: [{ label: "Docs", url: "https://docs.mistral.ai/capabilities/structured_output/json_mode" }] },
          { id: "mistral-finetuning-api", number: 263, title: "Fine-tuning API : workflow, datasets, hyperparamètres", slug: "mistral-finetuning-api", links: [{ label: "Docs", url: "https://docs.mistral.ai/capabilities/fine_tuning/" }] },
          { id: "mistral-guardrails", number: 264, title: "Guardrails & Moderation : safe_prompt, content filtering", slug: "mistral-guardrails", links: [{ label: "Docs", url: "https://docs.mistral.ai/capabilities/guardrailing" }] },
          { id: "mistral-batch-api", number: 265, title: "Batch API et optimisation des coûts", slug: "mistral-batch-api" },
          { id: "mistral-agents-api", number: 266, title: "Agents API et workflows Mistral", slug: "mistral-agents-api" },
        ],
      },
      {
        id: "mistral-solutions",
        title: "Solutions & Déploiement",
        lessons: [
          { id: "mistral-azure", number: 267, title: "Mistral sur Azure : partnership, Azure AI Studio", slug: "mistral-azure", links: [{ label: "Azure Blog", url: "https://azure.microsoft.com/en-us/blog/microsoft-and-mistral-ai-announce-new-partnership-to-accelerate-ai-innovation-and-introduce-mistral-large-first-on-azure/" }] },
          { id: "mistral-aws-gcp", number: 268, title: "Mistral sur AWS Bedrock et GCP", slug: "mistral-aws-gcp" },
          { id: "mistral-compute", number: 269, title: "Mistral Compute : infrastructure souveraine (datacenter France)", slug: "mistral-compute" },
          { id: "mistral-dassault", number: 270, title: "Partenariat Dassault Systèmes / OUTSCALE : cloud souverain", slug: "mistral-dassault", links: [{ label: "Annonce", url: "https://www.3ds.com/newsroom/press-releases/new-era-sovereign-ai-dassault-systemes-and-mistral-ai-deepen-their-partnership/" }] },
          { id: "mistral-on-premise", number: 271, title: "Déploiement on-premise et self-hosted", slug: "mistral-on-premise" },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PARTIE 6 : ÉCOSYSTÈME AI
  // ═══════════════════════════════════════════════════════════
  {
    id: "ecosysteme",
    title: "Écosystème AI",
    shortTitle: "Écosystème",
    description: "Acteurs majeurs, benchmarks et papers fondateurs",
    icon: "🌐",
    modules: [
      {
        id: "actors",
        title: "Acteurs majeurs — Fiches techniques",
        lessons: [
          { id: "openai", number: 272, title: "OpenAI : GPT-4/4o, o1/o3/o4, Sora", slug: "openai" },
          { id: "google-deepmind", number: 273, title: "Google DeepMind : Gemini, Gemma, recherche fondamentale", slug: "google-deepmind" },
          { id: "anthropic", number: 274, title: "Anthropic : Claude, Constitutional AI, safety-first", slug: "anthropic", arxiv: ["2212.08073"] },
          { id: "meta-ai", number: 275, title: "Meta AI : LLaMA 1/2/3, stratégie open-source", slug: "meta-ai", arxiv: ["2302.13971", "2407.21783"] },
          { id: "xai", number: 276, title: "xAI : Grok, architecture, Colossus cluster", slug: "xai" },
          { id: "deepseek", number: 277, title: "DeepSeek : DeepSeek-V2/V3, R1, MoE chinois", slug: "deepseek", arxiv: ["2501.12948"] },
          { id: "cohere-ai21", number: 278, title: "Cohere & AI21 Labs : enterprise NLP, Command R, Jamba", slug: "cohere-ai21" },
          { id: "hugging-face", number: 279, title: "Hugging Face : écosystème open-source, Transformers, Hub, Spaces", slug: "hugging-face" },
          { id: "nvidia-ecosystem", number: 280, title: "NVIDIA : hardware, software (CUDA, NIM, TensorRT)", slug: "nvidia-ecosystem" },
          { id: "stability-bfl", number: 281, title: "Stability AI / Black Forest Labs : Stable Diffusion, Flux", slug: "stability-bfl" },
        ],
      },
      {
        id: "benchmarks",
        title: "Benchmarks & Évaluation",
        lessons: [
          { id: "mmlu", number: 282, title: "MMLU et MMLU-Pro : connaissances générales", slug: "mmlu", arxiv: ["2009.03300"] },
          { id: "humaneval", number: 283, title: "HumanEval et MBPP : évaluation de code", slug: "humaneval" },
          { id: "math-gsm8k", number: 284, title: "MATH et GSM8K : raisonnement mathématique", slug: "math-gsm8k" },
          { id: "gpqa", number: 285, title: "GPQA : questions graduate-level", slug: "gpqa" },
          { id: "arc-hellaswag", number: 286, title: "ARC, HellaSwag, WinoGrande : raisonnement de bon sens", slug: "arc-hellaswag" },
          { id: "aime-benchmark", number: 287, title: "AIME et compétitions mathématiques : nouveau standard", slug: "aime-benchmark" },
          { id: "lmarena", number: 288, title: "LMArena (Chatbot Arena) : évaluation humaine ELO", slug: "lmarena" },
          { id: "benchmark-limits", number: 289, title: "Limites des benchmarks : contamination, gaming, saturation", slug: "benchmark-limits" },
        ],
      },
      {
        id: "seminal-papers",
        title: "Papers fondateurs annotés",
        lessons: [
          { id: "paper-transformer", number: 290, title: "\"Attention Is All You Need\" (2017)", slug: "paper-transformer", arxiv: ["1706.03762"] },
          { id: "paper-bert", number: 291, title: "\"BERT\" (2018)", slug: "paper-bert", arxiv: ["1810.04805"] },
          { id: "paper-gpt3", number: 292, title: "\"GPT-3 : Language Models are Few-Shot Learners\" (2020)", slug: "paper-gpt3", arxiv: ["2005.14165"] },
          { id: "paper-scaling-laws", number: 293, title: "\"Scaling Laws for Neural Language Models\" (2020)", slug: "paper-scaling-laws", arxiv: ["2001.08361"] },
          { id: "paper-chinchilla", number: 294, title: "\"Training Compute-Optimal LLMs\" / Chinchilla (2022)", slug: "paper-chinchilla", arxiv: ["2203.15556"] },
          { id: "paper-lora", number: 295, title: "\"LoRA\" (2021)", slug: "paper-lora", arxiv: ["2106.09685"] },
          { id: "paper-flash-attention", number: 296, title: "\"Flash Attention\" (2022)", slug: "paper-flash-attention", arxiv: ["2205.14135"] },
          { id: "paper-llama", number: 297, title: "\"LLaMA: Open and Efficient Foundation LMs\" (2023)", slug: "paper-llama", arxiv: ["2302.13971"] },
          { id: "paper-mamba", number: 298, title: "\"Mamba: Linear-Time Sequence Modeling\" (2023)", slug: "paper-mamba", arxiv: ["2312.00752"] },
          { id: "paper-mixtral", number: 299, title: "\"Mixtral of Experts\" (2024)", slug: "paper-mixtral", arxiv: ["2401.04088"] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PARTIE 7 : RESSOURCES & GLOSSAIRE
  // ═══════════════════════════════════════════════════════════
  {
    id: "ressources",
    title: "Ressources & Glossaire",
    shortTitle: "Ressources",
    description: "Glossaire, outils, frameworks, communautés",
    icon: "📚",
    modules: [
      {
        id: "resources",
        title: "Ressources",
        lessons: [
          { id: "glossary", number: 300, title: "Glossaire IA : 200+ termes définis (A-Z)", slug: "glossary" },
          { id: "frameworks-pytorch", number: 301, title: "Outils & Frameworks : PyTorch, JAX, Hugging Face Transformers", slug: "frameworks-pytorch" },
          { id: "frameworks-llm", number: 302, title: "Frameworks LLM : LangChain, LlamaIndex, Haystack, DSPy", slug: "frameworks-llm" },
          { id: "datasets", number: 303, title: "Datasets de référence : pré-entraînement, fine-tuning, évaluation", slug: "datasets" },
          { id: "youtube-channels", number: 304, title: "Chaînes YouTube recommandées", slug: "youtube-channels" },
          { id: "podcasts-newsletters", number: 305, title: "Podcasts & Newsletters", slug: "podcasts-newsletters" },
          { id: "certifications", number: 306, title: "Certifications et parcours complémentaires", slug: "certifications" },
          { id: "communities", number: 307, title: "Communautés : r/LocalLLaMA, Hugging Face Discord, EleutherAI", slug: "communities" },
        ],
      },
    ],
  },
];

// Helper functions
export function getAllLessons(): (Lesson & { partId: string; moduleId: string })[] {
  const lessons: (Lesson & { partId: string; moduleId: string })[] = [];
  for (const part of courseParts) {
    for (const module of part.modules) {
      for (const lesson of module.lessons) {
        lessons.push({ ...lesson, partId: part.id, moduleId: module.id });
      }
    }
  }
  return lessons;
}

export function getLessonBySlug(partId: string, slug: string) {
  const part = courseParts.find((p) => p.id === partId);
  if (!part) return null;
  for (const module of part.modules) {
    const lesson = module.lessons.find((l) => l.slug === slug);
    if (lesson) return { lesson, module, part };
  }
  return null;
}

export function getAdjacentLessons(partId: string, slug: string) {
  const allLessons = getAllLessons();
  const idx = allLessons.findIndex((l) => l.partId === partId && l.slug === slug);
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}

export function getTotalLessons(): number {
  return getAllLessons().length;
}
