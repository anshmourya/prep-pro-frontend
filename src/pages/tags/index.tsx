import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
const Tags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = [
    [
      "crypto",
      "blockchain",
      "smart-contracts",
      "nft",
      "startup",
      "future",
      "web3",
      "bitcoin",
    ],
    [
      "venture-capital",
      "ethereum",
      "java",
      "spring-boot",
      "spring",
      "cloud",
      "tech-news",
    ],
    [
      "security",
      "data-science",
      "react",
      "database",
      "architecture",
      "ai",
      "llm",
      "nlp",
    ],
    [
      "genai",
      "chatgpt",
      "openai",
      "elixir",
      "tools",
      "webdev",
      "rust",
      "devops",
      "ruby",
    ],
    [
      "machine-learning",
      "gaming",
      "business",
      "xbox",
      "microsoft",
      "game-development",
    ],
    [
      "unity",
      "unreal-engine",
      "community",
      "hardware",
      "python",
      "golang",
      "open-source",
    ],
    [
      "javascript",
      "mobile",
      "android",
      "ios",
      "ux",
      "performance",
      "google",
      "testing",
    ],
  ];

  const featuredTags = ["unity", "unreal-engine", "community"];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <div className="max-w-screen-lg px-4 pt-8 pb-16 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2 text-purple-800">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-purple-800"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-xl font-semibold">daily.dev</span>
          </div>

          <button className="px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700">
            Continue
          </button>
        </div>

        {/* Main Content */}
        <div className="mb-12 text-center">
          <h1 className="mb-8 text-3xl font-bold text-gray-800">
            Pick tags that are relevant to you
          </h1>

          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="search"
              placeholder="Search javascript, php, git, etc..."
              className="w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Tags Grid */}
          <div className="space-y-4">
            {tags.map((row, i) => (
              <div key={i} className="flex flex-wrap justify-center gap-2">
                {row.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      relative px-4 py-2 rounded-full text-sm font-medium
                      transition-colors duration-200
                      ${
                        selectedTags.includes(tag)
                          ? "bg-purple-600 text-white"
                          : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
                      }
                    `}
                  >
                    {tag}
                    {featuredTags.includes(tag) && (
                      <span className="absolute w-2 h-2 bg-purple-500 rounded-full -top-1 -right-1" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
