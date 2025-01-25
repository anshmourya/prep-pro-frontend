import {
  Globe,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bookmark,
  Link2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VideoCard() {
  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-full">
            <Globe className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              Productivity Tools for Web Developers
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs text-gray-600">
            #general-programming
          </Badge>
          <Badge variant="secondary" className="text-xs text-gray-600">
            +3
          </Badge>
        </div>
        <div className="text-sm text-gray-500">Oct 24, 2024 • 1m read time</div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-purple-50">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Productivity Tools for Web Developers
            </h3>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gray-200 border-2 border-white rounded-full" />
              <div className="w-8 h-8 bg-gray-300 border-2 border-white rounded-full" />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-600">
              Syn Tax
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <ThumbsUp className="w-4 h-4" />
            <span className="ml-1">31</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <ThumbsDown className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <MessageSquare className="w-4 h-4" />
            <span className="ml-1">1</span>
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Link2 className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
