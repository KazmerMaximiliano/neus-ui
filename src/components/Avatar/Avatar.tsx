import { useContext, useEffect, useRef, useState } from "react";
import "./Avatar.styles.css";
import { AvatarSizeContext } from "./Avatar.context";
import type { AvatarProps } from "./Avatar.types";
import { initialsOf } from "./Avatar.utils";

/** A person or organization shown as a picture, or as initials when there is none. */
export const Avatar = ({
  name,
  src,
  alt = name,
  size,
  shape,
  className,
  imageClassName,
  imageStyle,
  initialsClassName,
  initialsStyle,
  ...props
}: AvatarProps) => {
  const groupSize = useContext(AvatarSizeContext);
  const [failed, setFailed] = useState<string>();
  const image = useRef<HTMLImageElement>(null);
  // An image that failed before hydration fired its error event before React listened.
  useEffect(() => {
    if (image.current?.complete && image.current.naturalWidth === 0) setFailed(src);
  }, [src]);
  const showImage = Boolean(src) && failed !== src;

  return (
    <span
      {...props}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={["avatar", className].filter(Boolean).join(" ")}
      data-size={size ?? groupSize ?? "medium"}
      data-shape={shape}
    >
      {showImage ? (
        <img
          ref={image}
          src={src}
          alt=""
          className={["avatar__image", imageClassName].filter(Boolean).join(" ")}
          style={imageStyle}
          onError={() => setFailed(src)}
        />
      ) : (
        <span aria-hidden className={["avatar__initials", initialsClassName].filter(Boolean).join(" ")} style={initialsStyle}>
          {initialsOf(name)}
        </span>
      )}
    </span>
  );
};
