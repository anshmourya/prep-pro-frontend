import VideoCard from "@/components/video-card";
import React from "react";

const Feed = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {[1, 3, 4, 5, 5, 6, 7, 8, 9, 10].map((item: number) => (
        <VideoCard key={item} />
      ))}
    </div>
  );
};

export default Feed;
