import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type MediaPlaceholderProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  /** What the real picture will show, for example "Vet examining a dog in the consulting room". */
  label: string;
  /** CSS aspect ratio of the frame. */
  ratio?: string;
  labelClassName?: string;
  labelStyle?: CSSProperties;
};

export type MediaPlaceholderStoryArgs = MediaPlaceholderProps & { designSystem: DesignSystemId };
