import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useMediaQuery } from "../ui/useMediaQuery"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import useFeed from "@/apis/feed"
import {  useQuery } from "@tanstack/react-query"

export function SummaryModal({children , videoId}: {children: React.ReactNode , videoId: string}) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { getVideoSummary } = useFeed()

 const { data: summary } = useQuery({
     queryKey: ["summary", videoId],
     queryFn: () => getVideoSummary({ videoId }),
     enabled: !!videoId && !!open
 })
    
   
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <div className="grid gap-4 py-4">
            <h2 className="text-xl font-semibold">{summary?.data?.videoInfo.name}</h2>
            <div className="space-y-4">
              {summary?.data?.transcripts['en-US'].custom.map((item) => (
                <TranscriptItem key={item.start} item={item} />
              ))}
            </div>
          </div>    
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent >
        <div className="px-4 py-6 max-h-[80vh] overflow-y-auto">
          <h2 className="mb-4 text-xl font-semibold">Video Transcript</h2>
          <div className="space-y-4">
            {summary?.data?.transcripts['en-US'].custom.map((item) => (
              <TranscriptItem key={item.start} item={item}  />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}



interface TranscriptItemProps {
  item: {
    start: string
    end: string
    text: string
  }

}
export function TranscriptItem({ item }: TranscriptItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
 <div className="px-4 py-3 border-b last:border-b-0 hover:bg-muted/20">
      <div className="flex items-start justify-between">
        <div className="min-w-[50px] font-mono text-sm text-blue-500">{item.start}</div>
        {/* <div className="flex-1 ml-1 text-sm">summary</div> */}
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 ml-2 text-muted-foreground hover:bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
        </Button>
      </div>
      {isExpanded && <div className="mt-2 pl-[50px] text-sm text-muted-foreground pt-2">{item.text}</div>}
    </div>
  )
}