import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type AvatarSize = "small" | "medium" | "large";
export type AvatarShape = "circle" | "rounded";

export type AvatarProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  /** Person or organization; gives the initials and the accessible name. */
  name: string;
  /** Picture; the initials show while it is missing or when it fails to load. */
  src?: string;
  /** Accessible name; defaults to name. Pass "" when the name is already written beside the avatar. */
  alt?: string;
  /** Defaults to the enclosing AvatarGroup's size, then medium. */
  size?: AvatarSize;
  /** Overrides the system's avatar shape. */
  shape?: AvatarShape;
  imageClassName?: string;
  imageStyle?: CSSProperties;
  initialsClassName?: string;
  initialsStyle?: CSSProperties;
};

export type AvatarStoryArgs = AvatarProps & { designSystem: DesignSystemId };
