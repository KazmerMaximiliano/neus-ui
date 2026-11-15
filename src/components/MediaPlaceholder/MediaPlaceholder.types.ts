import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { PixabayPhoto } from "../../services/pixabay";

export type MediaPlaceholderProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  /** What the real picture will show, for example "Vet examining a dog in the consulting room". */
  readonly label: string;
  /** CSS aspect ratio of the frame. */
  readonly ratio?: string;
  /**
   * Words for the preview search, in the page's language; defaults to the label. Pixabay matches
   * every word, so two or three find more than a sentence.
   */
  readonly query?: string;
  /**
   * Pixabay API key that previews a matching stock photo while the page is designed. The key is
   * visible in the browser: pass it in development only.
   */
  readonly pixabayKey?: string;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  readonly imageClassName?: string;
  readonly imageStyle?: CSSProperties;
  readonly creditClassName?: string;
  readonly creditStyle?: CSSProperties;
};

/** The photo found for one request; a request with other props makes it stale. */
export type MediaPlaceholderPreview = { request: string; photo: PixabayPhoto };

export type MediaPlaceholderStoryArgs = MediaPlaceholderProps & { readonly designSystem: DesignSystemId };
