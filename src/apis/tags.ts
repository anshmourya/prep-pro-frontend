import { QueryData } from "@/hooks/useFilter";
import { apis } from ".";
import { TagResponse } from "./tags.schema";

const useTags = () => {
  const getTags = async (params: QueryData): Promise<TagResponse> => {
    const { data } = await apis.post("/tags", {
      data: params,
    });
    return data.data;
  };

  const associateUserWithTags = async (tagIds: string[]) => {
    const { data } = await apis.post("/tags/associate", {
      data: tagIds,
    });
    return data.data;
  };

  const getAssociatedTags = async (): Promise<string[]> => {
    const { data } = await apis.get("/tags/get-associated", {});
    return data.data;
  };
  return { getTags, associateUserWithTags, getAssociatedTags };
};

export default useTags;
