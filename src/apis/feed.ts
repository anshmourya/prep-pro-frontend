import { apis } from ".";
import { Feed } from "./feed.schema";

const useFeed = () => {
  const getFeed = async (): Promise<Feed> => {
    try {
      const { data } = await apis.get("/dashboard", {});
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return { getFeed };
};

export default useFeed;
