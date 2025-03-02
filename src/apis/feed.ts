import axios from "axios";
import { apis } from ".";
import { Feed, VideoSummary, YouTubeSearchResult, } from "./feed.schema";

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


  const getVideoSummary = async ({
    videoId,
  }: {
    videoId: string;
  }): Promise<VideoSummary> => {
    try {
      const { data } = await axios.get("https://youtube-video-summarizer-gpt-ai.p.rapidapi.com/api/v1/get-transcript-v2", {
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
          "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
          "Content-Type": "application/json",
          uniqueid: import.meta.env.VITE_RAPID_API_UNIQUE_ID
        },
        params: {
          video_id: videoId,
          platform: "youtube",
        },
      });
      return data
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getFeed, getVideoDetails, getVideoSummary };
};

export default useFeed;
