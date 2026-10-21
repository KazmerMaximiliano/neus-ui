import { type CSSProperties, useEffect, useState } from "react";
import { searchPixabayPhoto } from "../../services/pixabay";
import "./MediaPlaceholder.styles.css";
import type { MediaPlaceholderPreview, MediaPlaceholderProps } from "./MediaPlaceholder.types";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/**
 * A sized frame that stands in for a picture not taken yet and says what it will show. With a
 * Pixabay key it previews a matching stock photo over the frame once the photo has loaded.
 */
export const MediaPlaceholder = ({
  label,
  ratio = "4 / 3",
  query,
  pixabayKey,
  lang,
  className,
  style,
  labelClassName,
  labelStyle,
  imageClassName,
  imageStyle,
  creditClassName,
  creditStyle,
  ...props
}: MediaPlaceholderProps) => {
  const search = query ?? label;
  const request = [pixabayKey, search, lang, ratio].join("\n");
  const [preview, setPreview] = useState<MediaPlaceholderPreview>();
  const [loadedSrc, setLoadedSrc] = useState<string>();

  useEffect(() => {
    if (!pixabayKey) return;
    let active = true;
    searchPixabayPhoto({ key: pixabayKey, query: search, ratio, lang: lang || document.documentElement.lang }).then(
      (photo) => {
        if (active && photo) setPreview({ request, photo });
      },
      // A failed search leaves the placeholder; the browser's network panel shows why.
      () => {},
    );
    return () => {
      active = false;
    };
  }, [pixabayKey, search, lang, ratio, request]);

  const photo = preview?.request === request ? preview.photo : undefined;
  const loaded = photo !== undefined && loadedSrc === photo.src;

  return (
    <div
      {...props}
      lang={lang}
      role="img"
      aria-label={label}
      className={join("media-placeholder", className)}
      style={{ "--media-placeholder-ratio": ratio, ...style } as CSSProperties}
    >
      <span aria-hidden className={join("media-placeholder__label", labelClassName)} style={labelStyle}>
        {label}
      </span>
      {photo && (
        <img
          alt=""
          src={photo.src}
          data-loaded={loaded}
          className={join("media-placeholder__image", imageClassName)}
          style={imageStyle}
          onLoad={() => setLoadedSrc(photo.src)}
        />
      )}
      {loaded && (
        <span aria-hidden className={join("media-placeholder__credit", creditClassName)} style={creditStyle}>
          Pixabay · {photo.credit}
        </span>
      )}
    </div>
  );
};
