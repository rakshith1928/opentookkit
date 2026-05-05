import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "LLM", slug: "llm", emoji: "🧠", description: "Large language models and inference" },
  { name: "Agents", slug: "agents", emoji: "🤖", description: "Autonomous agents and multi-agent frameworks" },
  { name: "RAG", slug: "rag", emoji: "🔍", description: "Retrieval-augmented generation" },
  { name: "Embeddings", slug: "embeddings", emoji: "🧬", description: "Vector embeddings and similarity search" },
  { name: "Fine-tuning", slug: "fine-tuning", emoji: "🎯", description: "Model fine-tuning and RLHF" },
  { name: "Eval", slug: "eval", emoji: "📊", description: "Evaluation and benchmarking" },
  { name: "Vision", slug: "vision", emoji: "👁️", description: "Computer vision and multimodal models" },
  { name: "Speech", slug: "speech", emoji: "🎙️", description: "Speech recognition and synthesis" },
  { name: "Infra", slug: "infra", emoji: "⚙️", description: "Serving, deployment, and MLOps" },
];

const TOOLS = [
  {
    name: "LangChain",
    slug: "langchain",
    githubRepo: "https://github.com/langchain-ai/langchain",
    aiSummary: "Framework for building LLM-powered applications with composable chains, agents, and memory primitives. Ideal for developers building RAG pipelines, chatbots, and autonomous agents.",
    tags: ["agents", "llm", "python"],
    stars: 88200,
    forks: 13900,
    categories: ["llm", "agents"],
  },
  {
    name: "DSPy",
    slug: "dspy",
    githubRepo: "https://github.com/stanfordnlp/dspy",
    aiSummary: "Programming model for LLMs with declarative, self-optimising pipelines and automatic prompt tuning. Built for researchers and engineers who want to move beyond manual prompt engineering.",
    tags: ["llm", "eval", "python"],
    stars: 17100,
    forks: 1300,
    categories: ["llm", "eval"],
  },
  {
    name: "Chroma",
    slug: "chroma",
    githubRepo: "https://github.com/chroma-core/chroma",
    aiSummary: "Open-source embedding database with a simple API for storing, querying, and filtering vector data. The go-to choice for prototyping RAG applications locally.",
    tags: ["rag", "embeddings", "python"],
    stars: 14500,
    forks: 1200,
    categories: ["rag", "embeddings"],
  },
  {
    name: "LangGraph",
    slug: "langgraph",
    githubRepo: "https://github.com/langchain-ai/langgraph",
    aiSummary: "Library for building stateful multi-actor applications as cyclic graphs on top of LangChain. Best suited for complex agentic workflows requiring loops, branching, and human-in-the-loop.",
    tags: ["agents", "llm", "python"],
    stars: 6800,
    forks: 1100,
    categories: ["agents", "llm"],
  },
  {
    name: "Ollama",
    slug: "ollama",
    githubRepo: "https://github.com/ollama/ollama",
    aiSummary: "Run Llama, Mistral, Gemma, and other open models locally with a single command and REST API. The easiest way to self-host open-weight LLMs on a laptop or server.",
    tags: ["llm", "infra"],
    stars: 72300,
    forks: 5800,
    categories: ["llm", "infra"],
  },
  {
    name: "vLLM",
    slug: "vllm",
    githubRepo: "https://github.com/vllm-project/vllm",
    aiSummary: "High-throughput LLM serving engine with PagedAttention for 24x faster inference than HuggingFace Transformers. Designed for production deployments requiring high concurrency.",
    tags: ["infra", "llm", "python"],
    stars: 23900,
    forks: 3500,
    categories: ["infra", "llm"],
  },
  {
    name: "Whisper",
    slug: "whisper",
    githubRepo: "https://github.com/openai/whisper",
    aiSummary: "General-purpose speech recognition model trained on 680k hours of multilingual audio. Supports transcription and translation across 99 languages out of the box.",
    tags: ["speech", "python"],
    stars: 67000,
    forks: 7800,
    categories: ["speech"],
  },
  {
    name: "YOLO",
    slug: "yolo",
    githubRepo: "https://github.com/ultralytics/ultralytics",
    aiSummary: "State-of-the-art real-time object detection, segmentation, and classification models. Used in production vision pipelines across robotics, surveillance, and medical imaging.",
    tags: ["vision", "python"],
    stars: 31000,
    forks: 6100,
    categories: ["vision"],
  },
  {
    name: "Axolotl",
    slug: "axolotl",
    githubRepo: "https://github.com/axolotl-ai-cloud/axolotl",
    aiSummary: "Streamlined fine-tuning framework supporting LoRA, QLoRA, and full fine-tuning on a wide range of open models. Reduces boilerplate for training custom LLMs from days to hours.",
    tags: ["fine-tuning", "python"],
    stars: 7800,
    forks: 840,
    categories: ["fine-tuning"],
  },
  {
    name: "DeepEval",
    slug: "deepeval",
    githubRepo: "https://github.com/confident-ai/deepeval",
    aiSummary: "LLM evaluation framework with 14+ built-in metrics including hallucination, answer relevancy, and faithfulness. Integrates with CI/CD pipelines for automated regression testing of LLM outputs.",
    tags: ["eval", "python"],
    stars: 5200,
    forks: 420,
    categories: ["eval"],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // ── Categories ──────────────────────────────────────────────────────────────
  console.log("  Creating categories...");
  const categoryMap: Record<string, string> = {};

  for (const cat of CATEGORIES) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoryMap[cat.slug] = created.id;
  }
  console.log(`  ✓ ${CATEGORIES.length} categories`);

  // ── Seed user ───────────────────────────────────────────────────────────────
  console.log("  Creating seed user...");
  const seedUser = await prisma.user.upsert({
    where: { clerkId: "seed_user_001" },
    update: {},
    create: {
      clerkId: "seed_user_001",
      username: "opentoolkit",
      avatarUrl: "https://avatars.githubusercontent.com/u/0",
      role: "ADMIN",
    },
  });
  console.log(`  ✓ seed user: ${seedUser.username}`);

  // ── Tools ───────────────────────────────────────────────────────────────────
  console.log("  Creating tools...");
  for (const tool of TOOLS) {
    const created = await prisma.tool.upsert({
      where: { slug: tool.slug },
      update: {
        githubStars: tool.stars,
        githubForks: tool.forks,
        aiSummary: tool.aiSummary,
        tags: tool.tags,
      },
      create: {
        name: tool.name,
        slug: tool.slug,
        githubRepo: tool.githubRepo,
        aiSummary: tool.aiSummary,
        tags: tool.tags,
        githubStars: tool.stars,
        githubForks: tool.forks,
        status: "APPROVED",
        submittedById: seedUser.id,
      },
    });

    // Link categories
    for (const catSlug of tool.categories) {
      const catId = categoryMap[catSlug];
      if (!catId) continue;
      await prisma.toolCategory.upsert({
        where: { toolId_categoryId: { toolId: created.id, categoryId: catId } },
        update: {},
        create: { toolId: created.id, categoryId: catId },
      });
    }

    console.log(`  ✓ ${tool.name}`);
  }

  console.log("\n✅ Seed complete!");
  console.log(`   ${CATEGORIES.length} categories, 1 user, ${TOOLS.length} tools`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });