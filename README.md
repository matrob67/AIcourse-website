# AI State of the Art — Cours complet

**307 sections pour maitriser l'IA moderne** : ML, Deep Learning, LLM, NLP, MLOps, Robotics, Medical, et une section Mistral AI.

**Site en production** : [https://ai-course-website-seven.vercel.app](https://ai-course-website-seven.vercel.app)

## Stack technique

- **Framework** : Next.js 16 + React 19 + TypeScript
- **Contenu** : MDX avec LaTeX (KaTeX), syntax highlighting (Shiki)
- **Auth** : Clerk
- **Style** : Tailwind CSS 4
- **PWA** : Installable sur mobile (manifest + service worker)
- **Deploiement** : Vercel

## Structure du contenu

Les 351 fichiers MDX sont dans `src/content/` :

| Dossier | Sections | Description |
|---------|----------|-------------|
| `fondamentaux/` | 61 | ML, deep learning, transformers, GANs, RLHF |
| `state-of-the-art/` | 131 | LoRA, Flash Attention, MoE, agents, RAG, quantization |
| `mlops/` | 30 | GPU, cloud, CI/CD, monitoring, serving |
| `domaines/` | 25 | Robotique, medical, chimie, physique |
| `mistral/` | 42 | Modeles, APIs, deploiement Mistral AI |
| `ecosysteme/` | 29 | Companies, papers, benchmarks |
| `mathematiques/` | 24 | Probabilites, algebre, calcul, optimisation |
| `ressources/` | 9 | Frameworks, datasets, communautes |

## Dev local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).
