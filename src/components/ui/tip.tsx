import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

const Tip = ({
  content,
  children,
  className,
}: React.PropsWithChildren<{
  content: string | React.ReactNode;
  className?: string;
}>) => {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn("cursor-pointer", className)}
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onTouchStart={() => setOpen(!open)}
            onKeyDown={(e) => {
              e.preventDefault();
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              e.key === "Enter" && setOpen(!open);
            }}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent className={!content ? "hidden" : ""}>
          <span className="inline-block">{content}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default Tip;
