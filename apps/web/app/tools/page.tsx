import Navbar from "@/components/Navbar";
import ToolCard from "@/components/ToolCard";

const CATEGORIES = [
  "all", "llm", "agents", "rag", "embeddings",
  "fine-tuning", "eval", "vision", "speech", "infra",
];

const PLACEHOLDER_TOOLS = [
  { id: "1", name: "LangChain", slug: "langchain", desc: "Framework for building LLM-powered apps with composable chains, agents, and memory.", tags: ["agents", "llm"], stars: 88200, upvotes: 2400 },
  { id: "2", name: "DSPy", slug: "dspy", desc: "Programming model for LLMs — declarative, self-optimising pipelines with automatic prompt tuning.", tags: ["llm", "eval"], stars: 17100, upvotes: 1800 },
  { id: "3", name: "Chroma", slug: "chroma", desc: "Open-source embedding database with a simple API for storing, querying, and filtering vector data.", tags: ["rag", "embeddings"], stars: 14500, upvotes: 1200 },
  { id: "4", name: "LangGraph", slug: "langgraph", desc: "Library for building stateful multi-actor applications as cyclic graphs on top of LangChain.", tags: ["agents", "llm"], stars: 6800, upvotes: 980 },
  { id: "5", name: "Ollama", slug: "ollama", desc: "Run Llama, Mistral, Gemma and other open models locally with a single command and REST API.", tags: ["llm", "infra"], stars: 72300, upvotes: 870 },
  { id: "6", name: "vLLM", slug: "vllm", desc: "High-throughput LLM serving with PagedAttention for 24x faster inference than HuggingFace.", tags: ["infra", "llm"], stars: 23900, upvotes: 640 },
];

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">

        {/* Search + filters */}
        <div className="mb-6 flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50">
            <span className="font-mono text-xs text-gray-400">/</span>
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
              placeholder="Search tools, tags, or descriptions..."
            />
          </div>
          <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none hover:bg-gray-50">
            <option>sort: trending</option>
            <option>sort: newest</option>
            <option>sort: stars</option>
            <option>sort: upvotes</option>
          </select>
        </div>

        {/* Category pills */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${cat === "all"
                  ? "border-blue-300 bg-blue-50 text-blue-600"
                  : "border-gray-200 text-gray-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

      </main>
    </>
  );
}