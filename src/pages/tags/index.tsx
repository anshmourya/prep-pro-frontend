import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useTags from "@/apis/tags";
import useFilter from "@/hooks/useFilter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/header";
import { useDebouncedCallback } from "use-debounce";
import { useQueryClient } from "@tanstack/react-query";

const Tags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsToRemove, setTagsToRemove] = useState<string[]>([]);

  const { getTags, associateUserWithTags, getAssociatedTags } = useTags();

  const { filterOption, setQuery } = useFilter({
    options: {
      limit: 100,
    },
  });

  const { data: tags } = useQuery({
    queryKey: ["tags", filterOption],
    queryFn: () => getTags(filterOption),
  });

  const { data: associatedTags, refetch: refetchAssociatedTags } = useQuery({
    queryKey: ["associatedTags"],
    queryFn: () => getAssociatedTags(),
  });

  const queryClient = useQueryClient();

  const { mutate: associateUserWithTagsHandler } = useMutation({
    mutationFn: () => associateUserWithTags([...selectedTags, ...tagsToRemove]),
    onSuccess: () => {
      setTagsToRemove([]);
      setSelectedTags([]);
      refetchAssociatedTags();
    },
  });

  const debouncedAssociateUserWithTags = useDebouncedCallback(() => {
    associateUserWithTagsHandler();
  }, 1000);
  const toggleTag = (tag: string) => {
    const isTagAlreadySelected = selectedTags.includes(tag);
    const isTagAssociated = associatedTags?.includes(tag);

    // Optimistically update the UI first
    if (isTagAssociated) {
      // If tag is already associated, remove it from associatedTags immediately
      const updatedAssociatedTags =
        associatedTags?.filter((t) => t !== tag) || [];
      queryClient.setQueryData(["associatedTags"], updatedAssociatedTags);
      setTagsToRemove((prev) => [...prev.filter((t) => t !== tag), tag]);
    } else if (isTagAlreadySelected) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    } else {
      // If adding a new tag, update both selected and associated immediately
      setSelectedTags((prev) => [...prev, tag]);
      const updatedAssociatedTags = [...(associatedTags || []), tag];
      queryClient.setQueryData(["associatedTags"], updatedAssociatedTags);
    }

    debouncedAssociateUserWithTags();
  };

  /**
   * Debounced search function for projects.
   * @param value - The search value.
   */
  const search = useDebouncedCallback((value: string) => {
    setQuery({
      searchQuery: value === "" ? undefined : value,
    });
  }, 700);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <div className="max-w-screen-lg px-4 pt-8 pb-16 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <Logo />

          <button
            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!associatedTags || associatedTags.length <= 5}
          >
            Continue
          </button>
        </div>

        {/* Main Content */}
        <div className="mb-12 text-center">
          <h1 className="mb-8 text-3xl font-bold text-gray-800">
            Pick tags that are relevant to you
          </h1>

          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              onChange={(e) => search(e.target.value)}
              defaultValue={filterOption.query?.searchQuery}
              type="search"
              placeholder="Search javascript, php, git, etc..."
              className="w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Tags Grid */}
          <div className="flex flex-wrap justify-center gap-2">
            {tags?.data?.map((tag) => (
              <button
                key={tag._id}
                onClick={() => toggleTag(tag._id)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 w-fit",
                  associatedTags?.includes(tag._id) ||
                    selectedTags.includes(tag._id)
                    ? "bg-purple-600 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
                )}
              >
                {tag.name}
                {/* {featuredTags.includes(tag) && (
                    <span className="absolute w-2 h-2 bg-purple-500 rounded-full -top-1 -right-1" />
                  )} */}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
