import { apis } from ".";
import { Feed, YouTubeSearchResult, } from "./feed.schema";

const useFeed = () => {
  const getFeed = async ({
    pageParam,
  }: {
    pageParam: string;
  }): Promise<Feed> => {
    try {
      const { data } = await apis.get("/dashboard", {
        params: {
          pageToken: pageParam,
        },
      });
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getVideoDetails = async ({
    videoId,
  }: {
    videoId: string;
  }): Promise<YouTubeSearchResult> => {
    const { data } = await apis.get("/dashboard/video-details", {
      params: {
        videoId,
      },
    });
    return data?.data?.items[0];
  };

  return { getFeed, getVideoDetails };
};

export default useFeed;
