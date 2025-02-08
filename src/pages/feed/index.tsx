import useFeed from "@/apis/feed";
import VideoCard from "@/components/video-card";
import { useQuery } from "@tanstack/react-query";

const Feed = () => {
  const { getFeed } = useFeed();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* strip */}
      <div className="w-full px-4 py-3 mb-4 -mt-10 text-center text-white shadow-md bg-gradient-to-r from-orange-500 to-red-600">
        Customize your feed by selecting your interests! Choose keywords to get
        personalized video recommendations.{" "}
        <span className="underline cursor-pointer">Choose keywords</span>
      </div>
      <div className="grid w-full grid-cols-5 gap-4 mq450:grid-cols-1 mq825:grid-cols-2 mq1125:grid-cols-3 mq1400:grid-cols-4">
        {data?.items.map((item) => (
          <VideoCard key={item.id.videoId} video={item} />
        ))}
      </div>
    </>
  );
};

export default Feed;
