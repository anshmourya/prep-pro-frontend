import React, { useState } from "react";

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative ${props.className}`}>
      {loading && (
        <img
          {...props}
          loading="eager"
          src="https://www.asign.art/assets/images/pages/my-catalogue/noimage.png"
        />
      )}
      <img
        {...props}
        loading="eager"
        src={props.src ?? "/noimage.png"}
        className={`${props.className} ${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity`}
        onContextMenu={(e) => e.preventDefault()}
        onLoad={() => setLoading(false)}
        alt={props.alt ?? "Image"}
      />
    </div>
  );
};

export default Image;
