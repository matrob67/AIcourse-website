export interface Lesson {
  id: string;
  number: number;
  title: string;
  slug: string;
  arxiv?: string[];
  links?: { label: string; url: string }[];
  keywords?: string[];
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
          { id: "computational-complexity", number: 16, title: "Complexité computationnelle : P, NP, Kolmogorov et l'IA", slug: "computational-complexity" },
        ],
      },
      {
        id: "deep-learning",
        title: "Deep Learning — Architectures fondamentales",
        lessons: [
          { id: "cnn", number: 17, title: "Convolutional Neural Networks (CNN) : convolutions, pooling, feature maps", slug: "cnn" },
          { id: "cnn-architectures", number: 18, title: "Architectures CNN classiques : LeNet, AlexNet, VGG, ResNet", slug: "cnn-architectures", arxiv: ["1512.03385"] },
          { id: "transfer-learning-vision", number: 19, title: "Transfer learning en vision : fine-tuning de modèles pré-entraînés", slug: "transfer-learning-vision" },
          { id: "rnn", number: 20, title: "Recurrent Neural Networks (RNN) : séquences et mémoire", slug: "rnn" },
          { id: "lstm-gru", number: 21, title: "LSTM et GRU : résoudre le vanishing gradient", slug: "lstm-gru" },
          { id: "seq2seq-attention", number: 22, title: "Seq2Seq et le mécanisme d'attention (Bahdanau)", slug: "seq2seq-attention", arxiv: ["1409.0473"] },
          { id: "autoencoders", number: 23, title: "Autoencoders : compression et reconstruction", slug: "autoencoders" },
          { id: "vae", number: 24, title: "Variational Autoencoders (VAE)", slug: "vae", arxiv: ["1312.6114"], keywords: ["ELBO", "KL divergence", "reparameterization trick", "prior", "posterior", "espace latent"] },
          { id: "gan", number: 25, title: "Generative Adversarial Networks (GAN)", slug: "gan", arxiv: ["1406.2661"] },
          { id: "gan-advanced", number: 26, title: "Architectures GAN avancées : StyleGAN, CycleGAN, WGAN", slug: "gan-advanced" },
          { id: "diffusion-models-basics", number: 27, title: "Diffusion Models : principes fondamentaux", slug: "diffusion-models-basics", arxiv: ["2006.11239"] },
          { id: "score-based-flow", number: 28, title: "Score-based generative models et flow matching", slug: "score-based-flow" },
        ],
      },
      {
        id: "transformer",
        title: "Le Transformer — L'architecture qui a tout changé",
        lessons: [
          { id: "transformer-overview", number: 29, title: "Attention Is All You Need : vue d'ensemble", slug: "transformer-overview", arxiv: ["1706.03762"] },
          { id: "self-attention", number: 30, title: "Self-attention : query, key, value en détail", slug: "self-attention" },
          { id: "multi-head-attention", number: 31, title: "Multi-head attention : pourquoi et comment", slug: "multi-head-attention" },
          { id: "positional-encoding", number: 32, title: "Positional encoding : sinusoïdal vs appris vs RoPE", slug: "positional-encoding", arxiv: ["2104.09864"] },
          { id: "encoder-decoder", number: 33, title: "Architecture encoder-decoder complète", slug: "encoder-decoder" },
          { id: "ffn-residual", number: 34, title: "Feed-forward networks et residual connections", slug: "ffn-residual" },
          { id: "pre-post-norm", number: 35, title: "Pre-norm vs post-norm : impact sur le training", slug: "pre-post-norm" },
          { id: "transformer-vs-rnn", number: 36, title: "Pourquoi le Transformer a remplacé les RNN", slug: "transformer-vs-rnn" },
        ],
      },
      {
        id: "nlp",
        title: "NLP — Du classique au moderne",
        lessons: [
          { id: "tokenization-bpe", number: 37, title: "Tokenization : BPE (Byte Pair Encoding)", slug: "tokenization-bpe" },
          { id: "tokenization-other", number: 38, title: "Tokenization : WordPiece, SentencePiece, Unigram", slug: "tokenization-other" },
          { id: "word2vec", number: 39, title: "Word embeddings : Word2Vec (CBOW, Skip-gram)", slug: "word2vec", arxiv: ["1301.3781"] },
          { id: "glove-fasttext", number: 40, title: "GloVe et FastText : embeddings contextuels vs statiques", slug: "glove-fasttext" },
          { id: "bert", number: 41, title: "BERT : pre-training bidirectionnel, MLM, NSP", slug: "bert", arxiv: ["1810.04805"] },
          { id: "bert-variants", number: 42, title: "Variantes de BERT : RoBERTa, ALBERT, DeBERTa, DistilBERT", slug: "bert-variants" },
          { id: "gpt", number: 43, title: "GPT : auto-regressive language modeling", slug: "gpt", arxiv: ["2005.14165"] },
          { id: "t5", number: 44, title: "T5 : Text-to-Text Transfer Transformer", slug: "t5", arxiv: ["1910.10683"] },
          { id: "bart", number: 45, title: "BART et les modèles encoder-decoder pour la génération", slug: "bart" },
          { id: "sentence-embeddings", number: 46, title: "Sentence embeddings et similarity : SBERT", slug: "sentence-embeddings", arxiv: ["1908.10084"] },
        ],
      },
      {
        id: "llm-basics",
        title: "LLM — Comprendre les Large Language Models",
        lessons: [
          { id: "llm-overview", number: 47, title: "Qu'est-ce qu'un LLM ? Définition, échelle, capacités émergentes", slug: "llm-overview" },
          { id: "scaling-laws-kaplan", number: 48, title: "Scaling laws : les lois de Kaplan", slug: "scaling-laws-kaplan", arxiv: ["2001.08361"] },
          { id: "chinchilla", number: 49, title: "Chinchilla et les lois de scaling optimales", slug: "chinchilla", arxiv: ["2203.15556"] },
          { id: "pretraining", number: 50, title: "Pré-entraînement : données, objectifs (CLM, MLM, span corruption)", slug: "pretraining" },
          { id: "pretraining-datasets", number: 51, title: "Les datasets de pré-entraînement : Common Crawl, The Pile, RedPajama, FineWeb", slug: "pretraining-datasets" },
          { id: "finetuning-overview", number: 52, title: "Full fine-tuning vs parameter-efficient fine-tuning", slug: "finetuning-overview" },
          { id: "rlhf", number: 53, title: "RLHF : Reinforcement Learning from Human Feedback", slug: "rlhf", arxiv: ["2203.02155"], keywords: ["PPO", "reward model", "policy model", "critic model", "divergence KL"] },
          { id: "dpo", number: 54, title: "DPO : Direct Preference Optimization", slug: "dpo", arxiv: ["2305.18290"], keywords: ["Bradley-Terry", "preference learning", "RLHF alternative"] },
          { id: "constitutional-ai", number: 55, title: "Constitutional AI", slug: "constitutional-ai", arxiv: ["2212.08073"] },
          { id: "orpo-kto", number: 56, title: "ORPO, KTO et les alternatives à RLHF/DPO", slug: "orpo-kto", keywords: ["odds ratio", "Kahneman-Tversky", "preference optimization"] },
          { id: "emergent-abilities", number: 57, title: "Emergent abilities et phase transitions dans les LLM", slug: "emergent-abilities" },
          { id: "in-context-learning", number: 58, title: "In-context learning : comment ça marche ?", slug: "in-context-learning" },
          { id: "prompt-engineering", number: 59, title: "Prompt engineering : zero-shot, few-shot, system prompts", slug: "prompt-engineering" },
          { id: "chain-of-thought", number: 60, title: "Chain-of-thought prompting", slug: "chain-of-thought", arxiv: ["2201.11903"] },
          { id: "structured-output", number: 61, title: "Structured output : JSON mode, function calling, grammars", slug: "structured-output" },
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
          { id: "moe-principles", number: 62, title: "Mixture of Experts (MoE) : principes, routing, sparse gating", slug: "moe-principles", arxiv: ["2101.03961"] },
          { id: "moe-practice", number: 63, title: "MoE en pratique : Mixtral, DeepSeek-MoE, Grok", slug: "moe-practice", arxiv: ["2401.04088"] },
          { id: "expert-routing", number: 64, title: "Expert choice routing vs token choice routing", slug: "expert-routing" },
          { id: "s4", number: 65, title: "State Space Models : S4", slug: "s4", arxiv: ["2111.00396"] },
          { id: "mamba", number: 66, title: "Mamba : selective state spaces", slug: "mamba", arxiv: ["2312.00752"], keywords: ["SSM", "State Space Model", "sélection", "scan parallèle", "LTI"] },
          { id: "mamba2-jamba", number: 67, title: "Mamba-2 et Jamba : hybrides SSM + Attention", slug: "mamba2-jamba", arxiv: ["2405.21060"] },
          { id: "rwkv", number: 68, title: "RWKV : RNN linéaire à l'échelle des Transformers", slug: "rwkv", arxiv: ["2305.13048"] },
          { id: "retnet", number: 69, title: "RetNet (Retention Networks)", slug: "retnet", arxiv: ["2307.08621"] },
          { id: "hyena", number: 70, title: "Hyena et les convolutions longues", slug: "hyena", arxiv: ["2302.10866"] },
          { id: "hybrid-architectures", number: 71, title: "Architectures hybrides : le meilleur des deux mondes", slug: "hybrid-architectures" },
        ],
      },
      {
        id: "attention-advanced",
        title: "Mécanismes d'attention avancés",
        lessons: [
          { id: "mqa", number: 72, title: "Multi-Query Attention (MQA)", slug: "mqa", arxiv: ["1911.02150"] },
          { id: "gqa", number: 73, title: "Grouped Query Attention (GQA)", slug: "gqa", arxiv: ["2305.13245"] },
          { id: "flash-attention", number: 74, title: "Flash Attention : algorithme et impact", slug: "flash-attention", arxiv: ["2205.14135"], keywords: ["IO-aware", "memory-bound", "online softmax", "tiling", "SRAM", "HBM"] },
          { id: "flash-attention-2", number: 75, title: "Flash Attention 2", slug: "flash-attention-2", arxiv: ["2307.08691"] },
          { id: "flash-attention-3", number: 76, title: "Flash Attention 3 et les optimisations matérielles", slug: "flash-attention-3" },
          { id: "sliding-window-attention", number: 77, title: "Sliding Window Attention (Mistral)", slug: "sliding-window-attention" },
          { id: "ring-attention", number: 78, title: "Ring Attention : contextes ultra-longs", slug: "ring-attention", arxiv: ["2310.01889"] },
          { id: "sparse-attention", number: 79, title: "Sparse attention patterns : Longformer, BigBird", slug: "sparse-attention" },
          { id: "linear-attention", number: 80, title: "Linear attention et alternatives sub-quadratiques", slug: "linear-attention" },
          { id: "kv-cache", number: 81, title: "KV Cache : fonctionnement, compression, quantification", slug: "kv-cache", keywords: ["MLA", "Multi-Head Latent Attention", "prefill", "decode"] },
          { id: "rope", number: 82, title: "RoPE (Rotary Position Embedding) en détail", slug: "rope", arxiv: ["2104.09864"] },
          { id: "alibi", number: 83, title: "ALiBi et les alternatives à RoPE", slug: "alibi", arxiv: ["2108.12409"] },
          { id: "context-extension", number: 84, title: "Context window extension : YaRN, NTK-aware scaling", slug: "context-extension" },
        ],
      },
      {
        id: "training-modern",
        title: "Training — Techniques d'entraînement modernes",
        lessons: [
          { id: "mixed-precision", number: 85, title: "Mixed precision training : FP16, BF16", slug: "mixed-precision", arxiv: ["1710.03740"] },
          { id: "fp8-training", number: 86, title: "FP8 training et quantization-aware training", slug: "fp8-training" },
          { id: "data-parallelism", number: 87, title: "Data Parallelism (DP) et Distributed Data Parallel (DDP)", slug: "data-parallelism" },
          { id: "tensor-parallelism", number: 88, title: "Tensor Parallelism : couper les matrices", slug: "tensor-parallelism" },
          { id: "pipeline-parallelism", number: 89, title: "Pipeline Parallelism : couper les couches", slug: "pipeline-parallelism" },
          { id: "sequence-parallelism", number: 90, title: "Sequence Parallelism et Context Parallelism", slug: "sequence-parallelism" },
          { id: "zero", number: 91, title: "ZeRO : stage 1, 2, 3 (DeepSpeed)", slug: "zero", arxiv: ["1910.02054"] },
          { id: "fsdp", number: 92, title: "FSDP (Fully Sharded Data Parallelism) - PyTorch natif", slug: "fsdp" },
          { id: "megatron-lm", number: 93, title: "Megatron-LM : training massif chez NVIDIA", slug: "megatron-lm" },
          { id: "gradient-checkpointing", number: 94, title: "Gradient checkpointing / activation recomputation", slug: "gradient-checkpointing" },
          { id: "gradient-accumulation", number: 95, title: "Gradient accumulation et effective batch size", slug: "gradient-accumulation" },
          { id: "lr-scheduling", number: 96, title: "Learning rate scheduling : warmup, cosine, WSD", slug: "lr-scheduling" },
          { id: "curriculum-learning", number: 97, title: "Curriculum learning et data ordering", slug: "curriculum-learning" },
          { id: "data-quality", number: 98, title: "Data quality : deduplication, filtering, toxicity removal", slug: "data-quality" },
          { id: "synthetic-data-training", number: 99, title: "Données synthétiques pour le training : techniques et risques", slug: "synthetic-data-training" },
          { id: "continual-pretraining", number: 100, title: "Continual pre-training et domain adaptation", slug: "continual-pretraining" },
          { id: "scaling-infra", number: 101, title: "Scaling infrastructure : networking (InfiniBand, NVLink), storage", slug: "scaling-infra" },
        ],
      },
      {
        id: "peft",
        title: "Fine-tuning efficient (PEFT)",
        lessons: [
          { id: "lora", number: 102, title: "LoRA (Low-Rank Adaptation) en détail", slug: "lora", arxiv: ["2106.09685"], keywords: ["low-rank", "matrice de rang faible", "fine-tuning efficient", "PEFT"] },
          { id: "qlora", number: 103, title: "QLoRA : fine-tuning 4-bit", slug: "qlora", arxiv: ["2305.14314"] },
          { id: "dora", number: 104, title: "DoRA : Weight-Decomposed Low-Rank Adaptation", slug: "dora", arxiv: ["2402.09353"] },
          { id: "adapters", number: 105, title: "Adapters : modules additifs", slug: "adapters", arxiv: ["1902.00751"] },
          { id: "prefix-tuning", number: 106, title: "Prefix tuning", slug: "prefix-tuning", arxiv: ["2101.00190"] },
          { id: "prompt-tuning", number: 107, title: "Prompt tuning et soft prompts", slug: "prompt-tuning", arxiv: ["2104.08691"] },
          { id: "ia3", number: 108, title: "IA3 (Infused Adapter by Inhibiting and Amplifying Inner Activations)", slug: "ia3", arxiv: ["2205.05638"] },
          { id: "peft-comparison", number: 109, title: "PEFT : comparatif des méthodes, quand utiliser quoi", slug: "peft-comparison" },
          { id: "instruction-tuning", number: 110, title: "Instruction tuning : FLAN, Alpaca, OpenHermes, Orca", slug: "instruction-tuning" },
          { id: "rlhf-practice", number: 111, title: "RLHF en pratique : outils (TRL, OpenRLHF)", slug: "rlhf-practice", keywords: ["GRPO", "PPO", "DPO", "Group Relative Policy Optimization"] },
          { id: "grpo-odpo", number: 112, title: "GRPO & oDPO : au-delà de PPO pour l'alignement", slug: "grpo-odpo", keywords: ["GRPO", "oDPO", "online DPO", "Group Relative Policy Optimization", "PPO alternative", "alignement"] },
          { id: "dpo-practice", number: 113, title: "DPO en pratique : datasets, hyperparamètres", slug: "dpo-practice" },
          { id: "model-merging-ties", number: 114, title: "Model merging : TIES", slug: "model-merging-ties", arxiv: ["2306.01708"] },
          { id: "model-merging-dare", number: 115, title: "Model merging : DARE, model soups, SLERP", slug: "model-merging-dare", arxiv: ["2311.03099"] },
          { id: "eval-post-finetuning", number: 116, title: "Evaluation post fine-tuning : benchmarks et human eval", slug: "eval-post-finetuning" },
          { id: "cpt-long-context", number: 117, title: "CPT & Long context extension", slug: "cpt-long-context", keywords: ["Continued Pre-Training", "CPT", "long context", "RoPE scaling", "YaRN", "Position Interpolation"] },
          { id: "muon-lr-schedulers", number: 118, title: "Muon & LR schedulers avancés", slug: "muon-lr-schedulers", keywords: ["Muon optimizer", "WSD", "warmup-stable-decay", "schedule-free", "learning rate scheduling"] },
        ],
      },
      {
        id: "inference",
        title: "Inférence & Optimisation",
        lessons: [
          { id: "quantization-concepts", number: 117, title: "Quantization : concepts (INT8, INT4, FP4, NF4)", slug: "quantization-concepts", keywords: ["NormalFloat", "absmax", "zero-point", "calibration", "PTQ", "QAT"] },
          { id: "gptq", number: 118, title: "GPTQ : quantization post-training", slug: "gptq", arxiv: ["2210.17323"] },
          { id: "awq", number: 119, title: "AWQ (Activation-aware Weight Quantization)", slug: "awq", arxiv: ["2306.00978"] },
          { id: "gguf-llamacpp", number: 120, title: "GGUF et llama.cpp : quantization pour CPU/edge", slug: "gguf-llamacpp" },
          { id: "squeezellm", number: 121, title: "SqueezeLLM et autres techniques récentes", slug: "squeezellm" },
          { id: "speculative-decoding", number: 122, title: "Speculative decoding : draft model + verification", slug: "speculative-decoding", arxiv: ["2302.01318"] },
          { id: "medusa", number: 123, title: "Medusa : multi-head speculative decoding", slug: "medusa", arxiv: ["2401.10774"] },
          { id: "batching", number: 124, title: "Continuous batching et dynamic batching", slug: "batching" },
          { id: "paged-attention", number: 125, title: "PagedAttention et vLLM", slug: "paged-attention", arxiv: ["2309.06180"] },
          { id: "tensorrt-llm", number: 126, title: "TensorRT-LLM : compilation et optimisation NVIDIA", slug: "tensorrt-llm" },
          { id: "onnx-runtime", number: 127, title: "ONNX Runtime et les runtimes cross-platform", slug: "onnx-runtime" },
          { id: "distillation", number: 128, title: "Distillation de modèles : teacher-student", slug: "distillation", arxiv: ["1503.02531"] },
          { id: "pruning", number: 129, title: "Pruning : structured vs unstructured, magnitude, Wanda", slug: "pruning", arxiv: ["2306.11695"] },
          { id: "serving-frameworks", number: 130, title: "Serving frameworks comparés : vLLM, TGI, Triton, SGLang", slug: "serving-frameworks" },
          { id: "ollama-local", number: 131, title: "Ollama et llama.cpp : inférence locale", slug: "ollama-local" },
          { id: "memory-optimization", number: 132, title: "Optimisation mémoire : activation offloading, tensor offloading", slug: "memory-optimization" },
          { id: "qat", number: 133, title: "QAT : Quantization Aware Training", slug: "qat", keywords: ["Quantization Aware Training", "fake quantization", "Straight-Through Estimator", "STE"] },
          { id: "model-serving", number: 134, title: "Model serving : déployer un LLM en production", slug: "model-serving", keywords: ["vLLM", "TGI", "PagedAttention", "speculative decoding", "continuous batching"] },
          { id: "model-conversions", number: 135, title: "Model conversions : formats et compatibilité", slug: "model-conversions", keywords: ["safetensors", "GGUF", "ONNX", "TensorRT", "conversion"] },
        ],
      },
      {
        id: "rag",
        title: "Retrieval Augmented Generation (RAG)",
        lessons: [
          { id: "rag-overview", number: 133, title: "RAG : principe et architecture", slug: "rag-overview", arxiv: ["2005.11401"] },
          { id: "text-embeddings", number: 134, title: "Text embeddings : modèles et choix", slug: "text-embeddings" },
          { id: "vector-databases", number: 135, title: "Vector databases : Pinecone, Weaviate, Milvus, Chroma, Qdrant", slug: "vector-databases" },
          { id: "chunking", number: 136, title: "Chunking strategies : fixed, semantic, recursive, document-aware", slug: "chunking" },
          { id: "retrieval-methods", number: 137, title: "Dense retrieval vs sparse retrieval (BM25) vs hybrid", slug: "retrieval-methods" },
          { id: "reranking", number: 138, title: "Reranking : cross-encoders et ColBERT", slug: "reranking", arxiv: ["2004.12832"] },
          { id: "advanced-rag", number: 139, title: "Advanced RAG : self-querying, HyDE", slug: "advanced-rag", arxiv: ["2212.10496"] },
          { id: "graph-rag", number: 140, title: "Graph RAG : intégration de knowledge graphs", slug: "graph-rag" },
          { id: "agentic-rag", number: 141, title: "Agentic RAG : routing, multi-step retrieval", slug: "agentic-rag" },
          { id: "rag-evaluation", number: 142, title: "RAG evaluation : RAGAS, faithfulness, context relevance", slug: "rag-evaluation" },
          { id: "long-context-vs-rag", number: 143, title: "Long-context vs RAG : quand utiliser quoi ?", slug: "long-context-vs-rag" },
        ],
      },
      {
        id: "agents",
        title: "Agents & Tool Use",
        lessons: [
          { id: "agents-overview", number: 144, title: "Agents LLM : définition et taxonomie", slug: "agents-overview" },
          { id: "react", number: 145, title: "ReAct pattern : reasoning + acting", slug: "react", arxiv: ["2210.03629"] },
          { id: "function-calling", number: 146, title: "Function calling : design et implémentation", slug: "function-calling" },
          { id: "autogen", number: 147, title: "Multi-agent systems : AutoGen", slug: "autogen", arxiv: ["2308.08155"] },
          { id: "crewai-langgraph", number: 148, title: "CrewAI, LangGraph : orchestration d'agents", slug: "crewai-langgraph" },
          { id: "tree-of-thoughts", number: 149, title: "Planning : Tree of Thoughts", slug: "tree-of-thoughts", arxiv: ["2305.10601"] },
          { id: "graph-of-thoughts", number: 150, title: "Planning : Graph of Thoughts", slug: "graph-of-thoughts", arxiv: ["2308.09687"] },
          { id: "code-agents", number: 151, title: "Code generation agents : Devin, Cursor, Claude Code, Copilot", slug: "code-agents" },
          { id: "agent-memory", number: 152, title: "Memory pour agents : short-term, long-term, episodic, semantic", slug: "agent-memory" },
          { id: "mcp", number: 153, title: "MCP (Model Context Protocol) : standard d'intégration", slug: "mcp" },
          { id: "tool-use-patterns", number: 154, title: "Tool use et API orchestration : patterns avancés", slug: "tool-use-patterns" },
          { id: "agent-evaluation", number: 155, title: "Evaluation d'agents : benchmarks (SWE-bench, WebArena)", slug: "agent-evaluation" },
        ],
      },
      {
        id: "multimodal",
        title: "Multimodal AI",
        lessons: [
          { id: "vlm", number: 156, title: "Vision-Language Models : architecture et training", slug: "vlm", arxiv: ["2304.08485"] },
          { id: "clip", number: 157, title: "CLIP et contrastive learning vision-texte", slug: "clip", arxiv: ["2103.00020"] },
          { id: "vision-models-comparison", number: 158, title: "GPT-4V, Gemini Vision, Claude Vision : comparatif", slug: "vision-models-comparison" },
          { id: "pixtral", number: 159, title: "Pixtral (Mistral) : approche multimodale", slug: "pixtral" },
          { id: "text-to-image", number: 160, title: "Text-to-Image : Stable Diffusion, SDXL, Flux", slug: "text-to-image" },
          { id: "diffusion-models-images", number: 161, title: "Diffusion models pour images : DDPM, DDIM, classifier-free guidance", slug: "diffusion-models-images" },
          { id: "text-to-video", number: 162, title: "Text-to-Video : Sora, Runway Gen-3, Kling, Veo", slug: "text-to-video" },
          { id: "whisper-asr", number: 163, title: "Text-to-Audio : Whisper (ASR)", slug: "whisper-asr", arxiv: ["2212.04356"] },
          { id: "tts", number: 164, title: "Text-to-Speech : Bark, ElevenLabs, XTTS, F5-TTS", slug: "tts" },
          { id: "document-ocr", number: 165, title: "Document understanding & OCR : LayoutLM, Donut, Mistral OCR", slug: "document-ocr" },
          { id: "unified-multimodal", number: 166, title: "Unified multimodal architectures : Gemini, GPT-4o", slug: "unified-multimodal" },
        ],
      },
      {
        id: "reasoning",
        title: "Reasoning Models",
        lessons: [
          { id: "cot-fundamentals", number: 167, title: "Chain-of-thought prompting : fondamentaux", slug: "cot-fundamentals", arxiv: ["2201.11903"] },
          { id: "self-consistency", number: 168, title: "Self-consistency et majority voting", slug: "self-consistency", arxiv: ["2203.11171"] },
          { id: "openai-o1", number: 169, title: "OpenAI o1 : reasoning at inference time", slug: "openai-o1" },
          { id: "openai-o3-o4", number: 170, title: "OpenAI o3/o4-mini : évolution du reasoning", slug: "openai-o3-o4" },
          { id: "deepseek-r1", number: 171, title: "DeepSeek R1 : open-source reasoning", slug: "deepseek-r1", arxiv: ["2501.12948"], keywords: ["GRPO", "Group Relative Policy Optimization", "distillation", "reasoning"] },
          { id: "test-time-compute", number: 172, title: "Test-time compute scaling : plus de compute à l'inférence", slug: "test-time-compute" },
          { id: "prm-orm", number: 173, title: "Process Reward Models (PRM) vs Outcome Reward Models (ORM)", slug: "prm-orm", arxiv: ["2305.20050"] },
          { id: "self-verification", number: 174, title: "Self-verification et self-correction dans les LLM", slug: "self-verification" },
          { id: "magistral", number: 175, title: "Magistral (Mistral) : reasoning multilingue", slug: "magistral" },
          { id: "mcts-reasoning", number: 176, title: "MCTS (Monte Carlo Tree Search) pour le reasoning LLM", slug: "mcts-reasoning" },
          { id: "rlvr", number: 177, title: "Reward modeling et RLVR (RL with Verifiable Rewards)", slug: "rlvr", keywords: ["GRPO", "oDPO", "online DPO", "Group Relative Policy Optimization", "récompenses vérifiables"] },
          { id: "sai", number: 178, title: "SAI : Superhuman Adaptable Intelligence (LeCun, 2026)", slug: "sai", arxiv: ["2602.23643"], keywords: ["SAI", "AGI", "LeCun", "world model", "JEPA", "adaptation", "spécialisation"] },
          { id: "leworldmodel", number: 179, title: "LeWorldModel : JEPA stable depuis les pixels", slug: "leworldmodel", arxiv: ["2603.19312"], keywords: ["LeWM", "JEPA", "world model", "LeCun", "SIGReg", "pixels", "planning"] },
        ],
      },
      {
        id: "securite-interpretabilite",
        title: "Securite & Interpretabilite",
        lessons: [
          { id: "adversarial-attacks", number: 180, title: "Attaques adversariales : FGSM, PGD et robustesse des modeles", slug: "adversarial-attacks", arxiv: ["1412.6572", "1706.06083"] },
          { id: "prompt-injection", number: 181, title: "Prompt injection : attaques directes, indirectes et jailbreaking", slug: "prompt-injection" },
          { id: "interpretability", number: 182, title: "Interpretabilite et Explainability (XAI) : SHAP, LIME, mechanistic interpretability", slug: "interpretability", arxiv: ["1705.07874", "1602.04938"] },
          { id: "ai-safety-alignment", number: 183, title: "AI Safety et Alignement : reward hacking, RLHF, Constitutional AI", slug: "ai-safety-alignment", arxiv: ["2212.08073", "2305.18290"] },
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
          { id: "gpu-architecture", number: 180, title: "GPU : architecture, CUDA cores, tensor cores, HBM", slug: "gpu-architecture" },
          { id: "nvidia-gpus", number: 181, title: "NVIDIA H100, B200, GB200 : spécifications et comparaison", slug: "nvidia-gpus" },
          { id: "tpu", number: 182, title: "TPU (Google) : architecture et cas d'usage", slug: "tpu" },
          { id: "custom-chips", number: 183, title: "Accélérateurs spécialisés : Groq (LPU), Cerebras (WSE), Graphcore", slug: "custom-chips" },
          { id: "cuda-ecosystem", number: 184, title: "CUDA, cuDNN, NCCL : l'écosystème logiciel NVIDIA", slug: "cuda-ecosystem" },
          { id: "cloud-ai", number: 185, title: "Cloud AI : AWS SageMaker vs GCP Vertex AI vs Azure ML", slug: "cloud-ai" },
          { id: "cluster-management", number: 186, title: "Cluster management : Slurm, Kubernetes, Ray", slug: "cluster-management" },
          { id: "networking", number: 187, title: "Networking pour distributed training : InfiniBand, NVLink, NVSwitch", slug: "networking" },
          { id: "advanced-parallelism", number: 188, title: "Parallélisme avancé : Expert Parallelism, 3D parallelism, Ulysses", slug: "advanced-parallelism", keywords: ["Expert Parallelism", "3D parallelism", "Ulysses", "DeepSpeed-Ulysses", "context parallelism", "sequence parallelism avancé"] },
        ],
      },
      {
        id: "mlops-pipeline",
        title: "MLOps Pipeline",
        lessons: [
          { id: "experiment-tracking", number: 188, title: "Experiment tracking : MLflow, Weights & Biases, Neptune", slug: "experiment-tracking" },
          { id: "data-versioning", number: 189, title: "Data versioning : DVC, LakeFS", slug: "data-versioning" },
          { id: "model-registry", number: 190, title: "Model registry et versioning : MLflow, Hugging Face Hub", slug: "model-registry" },
          { id: "ci-cd-ml", number: 191, title: "CI/CD pour ML : tests, validation, déploiement automatisé", slug: "ci-cd-ml" },
          { id: "feature-stores", number: 192, title: "Feature stores : Feast, Tecton", slug: "feature-stores" },
          { id: "monitoring-drift", number: 193, title: "Monitoring : data drift, concept drift, performance degradation", slug: "monitoring-drift" },
          { id: "ab-testing-ml", number: 194, title: "A/B testing et canary deployments pour modèles", slug: "ab-testing-ml" },
        ],
      },
      {
        id: "llmops",
        title: "LLMOps",
        lessons: [
          { id: "prompt-management", number: 195, title: "Prompt management et versioning (LangSmith, Humanloop)", slug: "prompt-management" },
          { id: "llm-eval-benchmarks", number: 196, title: "Evaluation de LLM : benchmarks automatiques", slug: "llm-eval-benchmarks" },
          { id: "llm-as-judge", number: 197, title: "LLM-as-judge : utiliser un LLM pour évaluer un LLM", slug: "llm-as-judge", keywords: ["LLM-as-a-Judge", "évaluation automatique", "pairwise", "pointwise", "position bias", "MT-Bench", "Alpaca Eval"] },
          { id: "guardrails", number: 198, title: "Guardrails : content filtering, input/output validation", slug: "guardrails" },
          { id: "safety-redteaming", number: 199, title: "Safety : jailbreak prevention, red teaming", slug: "safety-redteaming" },
          { id: "cost-optimization", number: 200, title: "Cost optimization : prompt caching, semantic caching, model routing", slug: "cost-optimization" },
          { id: "llm-observability", number: 201, title: "Observabilité LLM : LangSmith, Arize, Phoenix, Langfuse", slug: "llm-observability" },
          { id: "gateway-loadbalancing", number: 202, title: "Gateway et load balancing : LiteLLM, Portkey", slug: "gateway-loadbalancing" },
        ],
      },
      {
        id: "data-engineering",
        title: "Data Engineering pour l'IA",
        lessons: [
          { id: "data-pipelines", number: 203, title: "Data pipelines à grande échelle (Spark, Dask, Ray Data)", slug: "data-pipelines" },
          { id: "web-scraping", number: 204, title: "Web scraping & data collection pour datasets ML", slug: "web-scraping" },
          { id: "data-dedup", number: 205, title: "Data cleaning, deduplication (MinHash, exact dedup)", slug: "data-dedup" },
          { id: "annotation-tools", number: 206, title: "Annotation : Label Studio, Prodigy, Argilla", slug: "annotation-tools" },
          { id: "rlhf-annotation", number: 207, title: "Annotation RLHF : outils et pipelines", slug: "rlhf-annotation" },
          { id: "synthetic-data", number: 208, title: "Synthetic data generation : techniques et qualité", slug: "synthetic-data" },
          { id: "data-governance", number: 209, title: "Data governance : GDPR, AI Act européen, compliance", slug: "data-governance" },
          { id: "dataloaders", number: 210, title: "Dataloaders & data pipelines pour le training", slug: "dataloaders", keywords: ["DataLoader", "PyTorch DataLoader", "streaming", "WebDataset", "Mosaic StreamingDataset", "prefetch", "num_workers"] },
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
          { id: "robotics-overview", number: 210, title: "Foundation models pour la robotique : vue d'ensemble", slug: "robotics-overview" },
          { id: "rt2", number: 211, title: "RT-2 (Google) : vision-language-action", slug: "rt2", arxiv: ["2307.15818"] },
          { id: "octo-openvla", number: 212, title: "Octo et OpenVLA : manipulation robotique open-source", slug: "octo-openvla" },
          { id: "sim-to-real", number: 213, title: "Simulation-to-real transfer : Isaac Sim, MuJoCo, Habitat", slug: "sim-to-real" },
          { id: "vla-models", number: 214, title: "Vision-Language-Action (VLA) models : architecture", slug: "vla-models" },
          { id: "manipulation", number: 215, title: "Manipulation robotique : grasping, dexterous manipulation", slug: "manipulation" },
          { id: "locomotion", number: 216, title: "Locomotion et navigation autonome", slug: "locomotion" },
          { id: "humanoid-robots", number: 217, title: "Humanoid robots : Tesla Optimus, Figure 01/02, 1X Neo", slug: "humanoid-robots" },
          { id: "rl-robotics", number: 218, title: "Reinforcement learning pour la robotique : PPO, SAC, TD3", slug: "rl-robotics" },
          { id: "world-models", number: 219, title: "World models pour la robotique et la planification", slug: "world-models" },
        ],
      },
      {
        id: "medical",
        title: "AI for Healthcare / Medical",
        lessons: [
          { id: "medical-llms", number: 220, title: "Medical LLMs : Med-PaLM 2, BioGPT, PMC-LLaMA", slug: "medical-llms" },
          { id: "medical-imaging", number: 221, title: "Medical imaging : radiology AI (détection, segmentation)", slug: "medical-imaging" },
          { id: "pathology-ai", number: 222, title: "Pathology AI : analyse de lames histologiques", slug: "pathology-ai" },
          { id: "drug-discovery", number: 223, title: "Drug discovery : AlphaFold 3 et protein structure", slug: "drug-discovery", arxiv: ["2402.04845"] },
          { id: "drug-design-diffusion", number: 224, title: "Diffusion models pour drug design : molécules et protéines", slug: "drug-design-diffusion" },
          { id: "clinical-nlp", number: 225, title: "Clinical NLP : extraction d'info, résumé de dossiers, CDS", slug: "clinical-nlp" },
          { id: "federated-learning", number: 226, title: "Federated learning : training sur données distribuées", slug: "federated-learning" },
          { id: "medical-regulation", number: 227, title: "Réglementation : FDA, CE marking, SaMD, AI Act pour le médical", slug: "medical-regulation" },
        ],
      },
      {
        id: "ai-science",
        title: "AI for Science",
        lessons: [
          { id: "alphafold", number: 228, title: "AlphaFold 1/2/3 : protein folding", slug: "alphafold" },
          { id: "weather-climate", number: 229, title: "Weather & climate : GraphCast, GenCast", slug: "weather-climate", arxiv: ["2212.12794"] },
          { id: "materials-discovery", number: 230, title: "Materials discovery : GNoME (Google)", slug: "materials-discovery", arxiv: ["2310.01308"] },
          { id: "math-reasoning", number: 231, title: "Mathematical reasoning : AlphaGeometry, AlphaProof", slug: "math-reasoning" },
          { id: "scientific-llms", number: 232, title: "Scientific LLMs : Galactica, SciBERT, domain-specific models", slug: "scientific-llms" },
          { id: "ai-physics", number: 233, title: "AI pour la physique : simulations, accélérateurs de particules", slug: "ai-physics" },
          { id: "ai-chemistry", number: 234, title: "AI pour la chimie : retrosynthesis, molecular generation", slug: "ai-chemistry" },
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
          { id: "mistral-history", number: 235, title: "Histoire de Mistral AI : fondation, fondateurs, vision", slug: "mistral-history" },
          { id: "mistral-open-source", number: 236, title: "Stratégie open-weight vs propriétaire : pourquoi et comment", slug: "mistral-open-source" },
          { id: "mistral-sovereignty", number: 237, title: "Positionnement européen & souveraineté numérique", slug: "mistral-sovereignty" },
          { id: "mistral-funding", number: 238, title: "Levées de fonds, valorisation, investisseurs", slug: "mistral-funding" },
        ],
      },
      {
        id: "mistral-models",
        title: "Les Modèles Mistral — Catalogue complet",
        lessons: [
          { id: "mistral-7b", number: 239, title: "Mistral 7B : le premier modèle, architecture et impact", slug: "mistral-7b", arxiv: ["2310.06825"], links: [{ label: "Blog", url: "https://mistral.ai/news/announcing-mistral-7b/" }] },
          { id: "mixtral-8x7b", number: 240, title: "Mixtral 8x7B : premier MoE open-source grand public", slug: "mixtral-8x7b", arxiv: ["2401.04088"], links: [{ label: "Blog", url: "https://mistral.ai/news/mixtral-of-experts" }] },
          { id: "mixtral-8x22b", number: 241, title: "Mixtral 8x22B : scaling du MoE", slug: "mixtral-8x22b", links: [{ label: "Blog", url: "https://mistral.ai/news/mixtral-8x22b/" }] },
          { id: "mistral-large-3", number: 242, title: "Mistral Large 3 : le flagship frontier", slug: "mistral-large-3", links: [{ label: "Blog", url: "https://mistral.ai/news/mistral-3" }] },
          { id: "mistral-medium-3", number: 243, title: "Mistral Medium 3 : équilibre coût/performance", slug: "mistral-medium-3", links: [{ label: "Modèles", url: "https://mistral.ai/models" }] },
          { id: "mistral-small-4", number: 244, title: "Mistral Small 4 : efficacité et rapidité", slug: "mistral-small-4", links: [{ label: "Modèles", url: "https://mistral.ai/models" }] },
          { id: "ministral", number: 245, title: "Ministral 3B / 8B / 14B : modèles edge", slug: "ministral", links: [{ label: "Blog", url: "https://mistral.ai/news/mistral-3" }] },
          { id: "pixtral-12b", number: 246, title: "Pixtral 12B : multimodal vision + texte", slug: "pixtral-12b", links: [{ label: "Modèles", url: "https://mistral.ai/models" }] },
          { id: "mistral-nemo", number: 247, title: "Mistral NeMo 12B : multilingual open-source (collab NVIDIA)", slug: "mistral-nemo", links: [{ label: "Blog", url: "https://mistral.ai/news/mistral-nemo" }] },
          { id: "codestral", number: 248, title: "Codestral : spécialiste code", slug: "codestral", links: [{ label: "Blog", url: "https://mistral.ai/news/codestral/" }] },
          { id: "devstral", number: 249, title: "Devstral 2 & Devstral Small 2 : coding nouvelle génération", slug: "devstral", links: [{ label: "Blog", url: "https://mistral.ai/news/mistral-3" }] },
          { id: "leanstral", number: 250, title: "Leanstral : preuves formelles pour code vérifiable", slug: "leanstral", links: [{ label: "Blog", url: "https://mistral.ai/news/leanstral" }, { label: "Docs", url: "https://docs.mistral.ai/models/leanstral-26-03" }] },
          { id: "magistral-model", number: 251, title: "Magistral (v1.2) : reasoning multilingue", slug: "magistral-model", arxiv: ["2506.10910"], links: [{ label: "Blog", url: "https://mistral.ai/news/magistral" }] },
          { id: "mistral-embed", number: 251, title: "Mistral Embed : embeddings pour recherche sémantique", slug: "mistral-embed", links: [{ label: "Docs", url: "https://docs.mistral.ai/capabilities/embeddings/" }] },
          { id: "mistral-models-comparison", number: 252, title: "Comparaison des modèles Mistral : quand utiliser lequel ?", slug: "mistral-models-comparison" },
        ],
      },
      {
        id: "mistral-engineering",
        title: "Engineering Mistral",
        lessons: [
          { id: "mistral-moe", number: 253, title: "Architecture MoE chez Mistral : routing sparse, 8 groupes d'experts", slug: "mistral-moe" },
          { id: "mistral-swa", number: 254, title: "Sliding Window Attention : implémentation Mistral", slug: "mistral-swa" },
          { id: "mistral-tokenization", number: 255, title: "Tokenization Mistral : vocabulaire 32K, choix et trade-offs", slug: "mistral-tokenization" },
          { id: "mistral-training-infra", number: 256, title: "Training infrastructure : NVIDIA Hopper, HBM3e, scaling", slug: "mistral-training-infra" },
          { id: "mistral-context-windows", number: 257, title: "Évolution des context windows : 32K → 128K → 256K", slug: "mistral-context-windows" },
          { id: "mistral-release-process", number: 258, title: "Open-weight release process : licences, Hugging Face, GGUF", slug: "mistral-release-process" },
        ],
      },
      {
        id: "mistral-products",
        title: "Produits & Plateforme",
        lessons: [
          { id: "la-plateforme", number: 259, title: "La Plateforme : API, modèles, free tier", slug: "la-plateforme", links: [{ label: "Blog", url: "https://mistral.ai/news/la-plateforme" }, { label: "Docs API", url: "https://docs.mistral.ai/api" }] },
          { id: "le-chat", number: 260, title: "Le Chat : Free / Pro / Enterprise", slug: "le-chat", links: [{ label: "Page produit", url: "https://mistral.ai/products/le-chat" }] },
          { id: "mistral-studio", number: 261, title: "Mistral AI Studio : plateforme enterprise production", slug: "mistral-studio", links: [{ label: "Page", url: "https://mistral.ai/products/studio" }] },
          { id: "mistral-forge", number: 262, title: "Mistral Forge : build-your-own AI enterprise", slug: "mistral-forge" },
          { id: "mistral-ocr", number: 263, title: "Mistral OCR : reconnaissance de documents", slug: "mistral-ocr", links: [{ label: "Blog", url: "https://mistral.ai/news/mistral-ocr" }] },
          { id: "mistral-vibe", number: 264, title: "Mistral Vibe : CLI pour dev assisté par IA", slug: "mistral-vibe" },
        ],
      },
      {
        id: "mistral-api",
        title: "Capabilities API en détail",
        lessons: [
          { id: "mistral-function-calling", number: 265, title: "Function calling Mistral : design patterns et exemples", slug: "mistral-function-calling", links: [{ label: "Docs", url: "https://docs.mistral.ai/capabilities/function_calling" }] },
          { id: "mistral-json-mode", number: 266, title: "JSON mode & Structured output : json_object vs json_schema", slug: "mistral-json-mode", links: [{ label: "Docs", url: "https://docs.mistral.ai/capabilities/structured_output/json_mode" }] },
          { id: "mistral-finetuning-api", number: 267, title: "Fine-tuning API : workflow, datasets, hyperparamètres", slug: "mistral-finetuning-api", links: [{ label: "Docs", url: "https://docs.mistral.ai/capabilities/fine_tuning/" }] },
          { id: "mistral-guardrails", number: 268, title: "Guardrails & Moderation : safe_prompt, content filtering", slug: "mistral-guardrails", links: [{ label: "Docs", url: "https://docs.mistral.ai/capabilities/guardrailing" }] },
          { id: "mistral-batch-api", number: 269, title: "Batch API et optimisation des coûts", slug: "mistral-batch-api" },
          { id: "mistral-agents-api", number: 270, title: "Agents API et workflows Mistral", slug: "mistral-agents-api" },
        ],
      },
      {
        id: "mistral-solutions",
        title: "Solutions & Déploiement",
        lessons: [
          { id: "mistral-azure", number: 271, title: "Mistral sur Azure : partnership, Azure AI Studio", slug: "mistral-azure", links: [{ label: "Azure Blog", url: "https://azure.microsoft.com/en-us/blog/microsoft-and-mistral-ai-announce-new-partnership-to-accelerate-ai-innovation-and-introduce-mistral-large-first-on-azure/" }] },
          { id: "mistral-aws-gcp", number: 272, title: "Mistral sur AWS Bedrock et GCP", slug: "mistral-aws-gcp" },
          { id: "mistral-compute", number: 273, title: "Mistral Compute : infrastructure souveraine (datacenter France)", slug: "mistral-compute" },
          { id: "mistral-dassault", number: 274, title: "Partenariat Dassault Systèmes / OUTSCALE : cloud souverain", slug: "mistral-dassault", links: [{ label: "Annonce", url: "https://www.3ds.com/newsroom/press-releases/new-era-sovereign-ai-dassault-systemes-and-mistral-ai-deepen-their-partnership/" }] },
          { id: "mistral-on-premise", number: 275, title: "Déploiement on-premise et self-hosted", slug: "mistral-on-premise" },
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
          { id: "comparatif-produits-api", number: 276, title: "Comparatif produits & API : OpenAI vs Anthropic vs Google vs Mistral (mars 2026)", slug: "comparatif-produits-api", keywords: ["OpenAI", "Anthropic", "Google", "Gemini", "Mistral", "GPT-5", "Claude", "pricing", "API", "function calling", "agents", "comparatif"] },
          { id: "openai", number: 277, title: "OpenAI : GPT-4/4o, o1/o3/o4, Sora", slug: "openai" },
          { id: "google-deepmind", number: 278, title: "Google DeepMind : Gemini, Gemma, recherche fondamentale", slug: "google-deepmind" },
          { id: "anthropic", number: 279, title: "Anthropic : Claude, Constitutional AI, safety-first", slug: "anthropic", arxiv: ["2212.08073"] },
          { id: "meta-ai", number: 280, title: "Meta AI : LLaMA 1/2/3, stratégie open-source", slug: "meta-ai", arxiv: ["2302.13971", "2407.21783"] },
          { id: "xai", number: 281, title: "xAI : Grok, architecture, Colossus cluster", slug: "xai" },
          { id: "deepseek", number: 282, title: "DeepSeek : DeepSeek-V2/V3, R1, MoE chinois", slug: "deepseek", arxiv: ["2501.12948"] },
          { id: "cohere-ai21", number: 283, title: "Cohere & AI21 Labs : enterprise NLP, Command R, Jamba", slug: "cohere-ai21" },
          { id: "hugging-face", number: 284, title: "Hugging Face : écosystème open-source, Transformers, Hub, Spaces", slug: "hugging-face" },
          { id: "nvidia-ecosystem", number: 285, title: "NVIDIA : hardware, software (CUDA, NIM, TensorRT)", slug: "nvidia-ecosystem" },
          { id: "stability-bfl", number: 286, title: "Stability AI / Black Forest Labs : Stable Diffusion, Flux", slug: "stability-bfl" },
        ],
      },
      {
        id: "benchmarks",
        title: "Benchmarks & Évaluation",
        lessons: [
          { id: "mmlu", number: 287, title: "MMLU et MMLU-Pro : connaissances générales", slug: "mmlu", arxiv: ["2009.03300"] },
          { id: "humaneval", number: 288, title: "HumanEval et MBPP : évaluation de code", slug: "humaneval" },
          { id: "math-gsm8k", number: 289, title: "MATH et GSM8K : raisonnement mathématique", slug: "math-gsm8k" },
          { id: "gpqa", number: 290, title: "GPQA : questions graduate-level", slug: "gpqa" },
          { id: "arc-hellaswag", number: 291, title: "ARC, HellaSwag, WinoGrande : raisonnement de bon sens", slug: "arc-hellaswag" },
          { id: "aime-benchmark", number: 292, title: "AIME et compétitions mathématiques : nouveau standard", slug: "aime-benchmark" },
          { id: "lmarena", number: 293, title: "LMArena (Chatbot Arena) : évaluation humaine ELO", slug: "lmarena" },
          { id: "benchmark-limits", number: 294, title: "Limites des benchmarks : contamination, gaming, saturation", slug: "benchmark-limits" },
          { id: "benchmaxxing", number: 295, title: "Benchmaxxing : quand les benchmarks deviennent le but", slug: "benchmaxxing", keywords: ["benchmaxxing", "Goodhart", "contamination", "benchmark gaming", "C-BOD", "Chatbot Arena", "LiveBench"] },
        ],
      },
      {
        id: "seminal-papers",
        title: "Papers fondateurs annotés",
        lessons: [
          { id: "paper-transformer", number: 296, title: "\"Attention Is All You Need\" (2017)", slug: "paper-transformer", arxiv: ["1706.03762"] },
          { id: "paper-bert", number: 297, title: "\"BERT\" (2018)", slug: "paper-bert", arxiv: ["1810.04805"] },
          { id: "paper-gpt3", number: 298, title: "\"GPT-3 : Language Models are Few-Shot Learners\" (2020)", slug: "paper-gpt3", arxiv: ["2005.14165"] },
          { id: "paper-scaling-laws", number: 299, title: "\"Scaling Laws for Neural Language Models\" (2020)", slug: "paper-scaling-laws", arxiv: ["2001.08361"] },
          { id: "paper-chinchilla", number: 300, title: "\"Training Compute-Optimal LLMs\" / Chinchilla (2022)", slug: "paper-chinchilla", arxiv: ["2203.15556"] },
          { id: "paper-lora", number: 301, title: "\"LoRA\" (2021)", slug: "paper-lora", arxiv: ["2106.09685"] },
          { id: "paper-flash-attention", number: 302, title: "\"Flash Attention\" (2022)", slug: "paper-flash-attention", arxiv: ["2205.14135"] },
          { id: "paper-llama", number: 303, title: "\"LLaMA: Open and Efficient Foundation LMs\" (2023)", slug: "paper-llama", arxiv: ["2302.13971"] },
          { id: "paper-mamba", number: 304, title: "\"Mamba: Linear-Time Sequence Modeling\" (2023)", slug: "paper-mamba", arxiv: ["2312.00752"] },
          { id: "paper-mixtral", number: 305, title: "\"Mixtral of Experts\" (2024)", slug: "paper-mixtral", arxiv: ["2401.04088"] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PARTIE 7 : FONDAMENTAUX MATHÉMATIQUES
  // ═══════════════════════════════════════════════════════════
  {
    id: "mathematiques",
    title: "Fondamentaux Mathématiques",
    shortTitle: "Maths",
    description: "Toutes les bases mathématiques nécessaires pour comprendre l'IA : algèbre linéaire, calcul, probabilités, optimisation, théorie de l'information",
    icon: "🧮",
    modules: [
      {
        id: "algebre-lineaire",
        title: "Algèbre linéaire",
        lessons: [
          { id: "vectors-matrices", number: 314, title: "Vecteurs et matrices : les briques de base", slug: "vectors-matrices" },
          { id: "matrix-operations", number: 315, title: "Opérations matricielles : multiplication, transposée, inverse", slug: "matrix-operations" },
          { id: "eigenvalues", number: 316, title: "Valeurs propres et vecteurs propres", slug: "eigenvalues" },
          { id: "svd", number: 317, title: "Décomposition en valeurs singulières (SVD)", slug: "svd" },
          { id: "vector-spaces", number: 318, title: "Espaces vectoriels, bases et projections", slug: "vector-spaces" },
          { id: "norms-distances", number: 319, title: "Normes et distances : L1, L2, cosinus", slug: "norms-distances" },
        ],
      },
      {
        id: "calcul",
        title: "Calcul différentiel et intégral",
        lessons: [
          { id: "derivatives", number: 320, title: "Dérivées et gradients : l'intuition géométrique", slug: "derivatives" },
          { id: "chain-rule", number: 321, title: "Règle de la chaîne : le cœur de la backpropagation", slug: "chain-rule" },
          { id: "partial-derivatives", number: 322, title: "Dérivées partielles et jacobienne", slug: "partial-derivatives" },
          { id: "taylor-series", number: 323, title: "Séries de Taylor et approximations", slug: "taylor-series" },
          { id: "integrals-ml", number: 324, title: "Intégrales en ML : marginalisation et espérance", slug: "integrals-ml" },
        ],
      },
      {
        id: "probabilites",
        title: "Probabilités et statistiques",
        lessons: [
          { id: "probability-basics", number: 325, title: "Probabilités : axiomes, conditionnelle, Bayes", slug: "probability-basics" },
          { id: "distributions", number: 326, title: "Distributions : gaussienne, Bernoulli, catégorielle, softmax", slug: "distributions" },
          { id: "expectation-variance", number: 327, title: "Espérance, variance et moments", slug: "expectation-variance" },
          { id: "maximum-likelihood", number: 328, title: "Maximum de vraisemblance (MLE) et MAP", slug: "maximum-likelihood" },
          { id: "sampling", number: 329, title: "Échantillonnage : Monte Carlo, importance sampling, MCMC", slug: "sampling" },
        ],
      },
      {
        id: "optimisation",
        title: "Optimisation",
        lessons: [
          { id: "convexity", number: 330, title: "Convexité : fonctions convexes, minima locaux vs globaux", slug: "convexity" },
          { id: "gradient-methods", number: 331, title: "Méthodes de gradient : convergence, learning rate, momentum", slug: "gradient-methods" },
          { id: "lagrange-constraints", number: 332, title: "Optimisation sous contraintes : Lagrange et KKT", slug: "lagrange-constraints" },
          { id: "numerical-stability", number: 333, title: "Stabilité numérique : overflow, underflow, log-sum-exp", slug: "numerical-stability" },
        ],
      },
      {
        id: "theorie-information",
        title: "Théorie de l'information",
        lessons: [
          { id: "entropy", number: 334, title: "Entropie : mesurer l'incertitude", slug: "entropy" },
          { id: "kl-divergence", number: 335, title: "Divergence KL et cross-entropie", slug: "kl-divergence" },
          { id: "mutual-information", number: 336, title: "Information mutuelle et ses applications en ML", slug: "mutual-information" },
          { id: "game-theory", number: 337, title: "Théorie des jeux", slug: "game-theory", keywords: ["Nash", "minimax", "dilemme du prisonnier", "GAN", "multi-agent", "mechanism design", "Pareto"] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PARTIE 8 : RESSOURCES & GLOSSAIRE
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
          { id: "glossary", number: 306, title: "Glossaire IA : 200+ termes définis (A-Z)", slug: "glossary" },
          { id: "frameworks-pytorch", number: 307, title: "Outils & Frameworks : PyTorch, JAX, Hugging Face Transformers", slug: "frameworks-pytorch" },
          { id: "frameworks-llm", number: 308, title: "Frameworks LLM : LangChain, LlamaIndex, Haystack, DSPy", slug: "frameworks-llm" },
          { id: "datasets", number: 309, title: "Datasets de référence : pré-entraînement, fine-tuning, évaluation", slug: "datasets" },
          { id: "youtube-channels", number: 310, title: "Chaînes YouTube recommandées", slug: "youtube-channels" },
          { id: "podcasts-newsletters", number: 311, title: "Podcasts & Newsletters", slug: "podcasts-newsletters" },
          { id: "certifications", number: 312, title: "Certifications et parcours complémentaires", slug: "certifications" },
          { id: "communities", number: 313, title: "Communautés : r/LocalLLaMA, Hugging Face Discord, EleutherAI", slug: "communities" },
          { id: "glossaire-it", number: 314, title: "Glossaire IT : terminologie informatique pour l'IA", slug: "glossaire-it", keywords: ["API", "REST", "gRPC", "Docker", "Kubernetes", "CI/CD", "microservices", "load balancer", "reverse proxy"] },
        ],
      },
    ],
  },
];

// ─── i18n support ───────────────────────────────────────────────
import type { Locale } from "./i18n";
import { partTitlesEn, moduleTitlesEn, lessonTitlesEn } from "./course-titles-en";

/**
 * Returns course parts with translated titles for the given locale.
 * Structure (IDs, slugs, ordering) is always the same — only display strings change.
 */
export function getCourseParts(locale: Locale = "fr"): Part[] {
  if (locale === "fr") return courseParts;

  return courseParts.map((part) => ({
    ...part,
    title: partTitlesEn[part.id]?.title ?? part.title,
    shortTitle: partTitlesEn[part.id]?.shortTitle ?? part.shortTitle,
    description: partTitlesEn[part.id]?.description ?? part.description,
    modules: part.modules.map((mod) => ({
      ...mod,
      title: moduleTitlesEn[mod.id] ?? mod.title,
      lessons: mod.lessons.map((lesson) => ({
        ...lesson,
        title: lessonTitlesEn[lesson.id] ?? lesson.title,
      })),
    })),
  }));
}

// Helper functions
export function getAllLessons(locale: Locale = "fr"): (Lesson & { partId: string; moduleId: string })[] {
  const lessons: (Lesson & { partId: string; moduleId: string })[] = [];
  for (const part of getCourseParts(locale)) {
    for (const module of part.modules) {
      for (const lesson of module.lessons) {
        lessons.push({ ...lesson, partId: part.id, moduleId: module.id });
      }
    }
  }
  return lessons;
}

export function getLessonBySlug(partId: string, slug: string, locale: Locale = "fr") {
  const parts = getCourseParts(locale);
  const part = parts.find((p) => p.id === partId);
  if (!part) return null;
  for (const module of part.modules) {
    const lesson = module.lessons.find((l) => l.slug === slug);
    if (lesson) return { lesson, module, part };
  }
  return null;
}

export function getAdjacentLessons(partId: string, slug: string, locale: Locale = "fr") {
  const allLessons = getAllLessons(locale);
  const idx = allLessons.findIndex((l) => l.partId === partId && l.slug === slug);
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}

export function getTotalLessons(locale: Locale = "fr"): number {
  return getAllLessons(locale).length;
}
