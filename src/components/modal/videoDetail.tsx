import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Bookmark,
  Link2,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export function VideoDetailDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const Content = () => (
    <div className="w-full max-w-3xl mx-auto text-black max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-start gap-3 p-4 border-b">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>SF</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h2 className="font-semibold">Santiago Fernandez</h2>
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">1.1K</span>
            <Badge
              variant="secondary"
              className="text-purple-800 bg-purple-100 hover:bg-purple-200"
            >
              Admin
            </Badge>
          </div>
          <div className="text-sm text-black-foreground ">
            @santifprimary • Dec 15, 2024 • Top reader in Debezium
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h1 className="mb-3 text-xl font-bold">Best design system examples</h1>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="text-purple-800 bg-purple-100">
            community
          </Badge>
          <span className="text-sm text-muted-foreground">• 16m read time</span>
        </div>

        <div className="mb-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bXkwuefjwyXPjqSSa5QGXyC19gm7fg.png"
            alt="Design System Examples"
            className="w-full rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold text-purple-600">TLDR</div>
          <p className="text-muted-foreground">
            Exploring top design system examples to help build or improve your
            own, this post covers the essentials like consistency, efficiency,
            scalability, collaboration, and quality control. Featuring IBM's
            Carbon, Atlassian's, and Adobe's Spectrum design systems, it offers
            insights into unique approaches and best practices in design
            systems.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="justify-between w-full"
          >
            Hide TLDR
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 p-4 border-t">
        <div className="flex items-center">
          <Button variant="ghost" size="sm">
            <ArrowBigUp className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium">105</span>
          <Button variant="ghost" size="sm">
            <ArrowBigDown className="w-5 h-5" />
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <MessageSquare className="w-4 h-4 mr-1" />
          Comment
        </Button>
        <Button variant="ghost" size="sm">
          <Bookmark className="w-4 h-4 mr-1" />
          Bookmark
        </Button>
        <Button variant="ghost" size="sm">
          <Link2 className="w-4 h-4 mr-1" />
          Copy
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div onClick={() => setIsOpen(true)}>{children}</div>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="">
            <Content />
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <Content />
        </DialogContent>
      </Dialog>
    </>
  );
}
