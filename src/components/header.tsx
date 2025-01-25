import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CommandDialog } from "@/components/ui/command";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 border-b h-14 border-border bg-background">
      <div className="flex items-center gap-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground"
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
        <span className="text-lg font-semibold">Prep Pro</span>
      </div>

      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center w-full px-3 py-1 text-sm transition-colors border rounded-md shadow-sm h-9 border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-background"
          >
            <Search className="w-4 h-4 mr-2 opacity-50 shrink-0" />
            <span className="flex-1 text-left text-muted-foreground">
              Search...
            </span>
            <div className="flex">
              <kbd className="flex min-w-5 justify-center rounded-8 border border-border-subtlest-tertiary bg-background-subtle px-2 py-0.5 font-sans text-text-tertiary typo-footnote">
                Ctrl
              </kbd>
              <span className="mx-1 py-0.5 text-text-tertiary typo-footnote">
                +
              </span>
              <kbd className="flex min-w-5 justify-center rounded-8 border border-border-subtlest-tertiary bg-background-subtle px-2 py-0.5 font-sans text-text-tertiary typo-footnote">
                K
              </kbd>
            </div>
          </button>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center px-3 border-b">
          <Search className="w-4 h-4 mr-2 opacity-50 shrink-0" />
          <Input
            placeholder="Type a command or search..."
            className="px-0 border-0 h-11 focus-visible:ring-0"
          />
        </div>
      </CommandDialog>
    </header>
  );
}
