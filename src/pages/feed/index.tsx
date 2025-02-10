import useFeed from "@/apis/feed";
import useTags from "@/apis/tags";
import VideoCard from "@/components/video-card";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { VideoDetailDialog } from "@/components/modal/videoDetail";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Feed = () => {
  const { getFeed } = useFeed();
  const { getAssociatedTags } = useTags();
  const { logout } = useKindeAuth();

  const { data: associatedTags } = useQuery({
    queryKey: ["associatedTags"],
    queryFn: () => getAssociatedTags(),
  });
  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: getFeed,
      initialPageParam: "",
      getNextPageParam: (lastPage) => {
        return lastPage.nextPageToken;
      },
      enabled: !!associatedTags && associatedTags.length > 0,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-10">
        <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin border-t-blue-600" />
      </div>
    );
  if (isError) return <div>Error: {error.message}</div>;

  if (!associatedTags || associatedTags.length === 0)
    return <Navigate to="/tags" />;

  return (
    <>
      <button onClick={() => logout()}>logout</button>
      <div className="grid w-full grid-cols-5 gap-4 mq450:grid-cols-1 mq825:grid-cols-2 mq1125:grid-cols-3 mq1400:grid-cols-4">
        {data?.pages.map((page) =>
          page.items.map((item) => (
            <VideoDetailDialog key={item.id.videoId}>
              <VideoCard video={item} />
            </VideoDetailDialog>
          ))
        )}
      </div>
      <div ref={ref} className="flex items-center justify-center h-10">
        {isFetchingNextPage && (
          <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin border-t-blue-600" />
        )}
      </div>
    </>
  );
};

export default Feed;
