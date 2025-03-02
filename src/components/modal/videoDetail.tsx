import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactPlayer from "react-player/youtube"
import {
  ArrowBigUp,
  Link2,
  Globe,
  Check,
} from "lucide-react"
import useFeed from "@/apis/feed"
import { useQuery } from "@tanstack/react-query"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { formatDuration } from "@/lib/utils"
import { SummaryModal } from "./Sumarry"

function CopyButton({ videoId }: { videoId: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    const url = `https://www.youtube.com/watch?v=${videoId}`
    navigator.clipboard.writeText(url)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy}>
      {isCopied ? (
        <Check className="w-4 h-4 mr-1" />
      ) : (
        <Link2 className="w-4 h-4 mr-1" />
      )}
      {isCopied ? 'Copied' : 'Copy'}
    </Button>
  )
}

export function VideoDetailDialog({ children, videoId }: { children: React.ReactNode, videoId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { getVideoDetails } = useFeed()
  const [isPlaying, setIsPlaying] = useState(false)

  const { data: videoDetails, isLoading: isVideoDetailsLoading } = useQuery({
    queryKey: ["videoDetails", videoId],
    queryFn: () => getVideoDetails({ videoId }),
    enabled: !!videoId && !!isOpen,
  })

 

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const Content = () => (
    <div className="w-full max-w-3xl mx-auto text-gray-900 bg-white max-h-[90vh] overflow-y-auto">
      {/* Community Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b">
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="text-gray-600">{videoDetails?.snippet.channelTitle}</span>
      </div>

      {/* Author Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Avatar className="w-12 h-12">
          <AvatarImage src={videoDetails?.snippet.thumbnails.default.url} />
          <AvatarFallback>{videoDetails?.snippet.channelTitle.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold">{videoDetails?.snippet.channelTitle}</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h1 className="mb-3 text-xl font-bold">
          {videoDetails?.snippet.title}
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="w-6 h-6">
            <AvatarImage src={videoDetails?.snippet.thumbnails.default.url} />
            <AvatarFallback>{videoDetails?.snippet.channelTitle.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{videoDetails?.snippet.channelTitle}</span>
          <span className="text-sm text-gray-600">• {videoDetails?.contentDetails.duration && formatDuration(videoDetails.contentDetails.duration)}</span>
        </div>

        {/* Video Section */}
        {!isPlaying ? (
          <div className="relative w-full mb-6 overflow-hidden bg-gray-100 rounded-lg aspect-video group">
            <img
              src={videoDetails?.snippet.thumbnails.high?.url}
              alt={videoDetails?.snippet.title}
              className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 rounded-lg group-hover:scale-105"
            />
            {/* Add a subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 transition-all duration-300 shadow-lg bg-white/90 hover:bg-white hover:scale-105"
                onClick={() => setIsPlaying(true)}
              >
                <svg className="w-6 h-6 text-red-600 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch on YouTube
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative w-full mb-6 aspect-video">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              width="100%"
              height="100%"
              controls
              playing={true}
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="text-sm font-semibold text-purple-600">TLDR</div>
          <p className="text-gray-600 whitespace-pre-wrap">
            {videoDetails?.snippet.description}
          </p>

        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 p-4 border-t">
        <div className="flex items-center">
          <Button variant="ghost" size="sm">
            <ArrowBigUp className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium">{videoDetails?.statistics.likeCount}</span>
        </div>

        <CopyButton videoId={videoId} />
        <SummaryModal videoId={videoId}>
          <Button variant="ghost" size="sm">
          Generate Summary
          </Button>
        </SummaryModal>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <div onClick={() => setIsOpen(true)}>{children}</div>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <VisuallyHidden asChild>
            <DrawerTitle>Video Details</DrawerTitle>
          </VisuallyHidden>
          <DrawerContent className="max-h-[90vh] overflow-y-auto">
            {isVideoDetailsLoading ? <div>Loading...</div> : <Content />}
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl p-0">
          <VisuallyHidden asChild>
            <DialogTitle>Video Details</DialogTitle>
          </VisuallyHidden>
          {isVideoDetailsLoading ? <div>Loading...</div> : <Content />}
        </DialogContent>
      </Dialog>
    </>
  )
}
