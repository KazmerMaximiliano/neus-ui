import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type AvatarSize = "small" | "medium" | "large";
export type AvatarShape = "circle" | "rounded";

export type AvatarProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  /** Person or organization; gives the initials and the accessible name. */
  readonly name: string;
  /** Picture; the initials show while it is missing or when it fails to load. */
  readonly src?: string;
  /** Accessible name; defaults to name. Pass "" when the name is already written beside the avatar. */
  readonly alt?: string;
  /** Defaults to the enclosing AvatarGroup's size, then medium. */
  readonly size?: AvatarSize;
  /** Overrides the system's avatar shape. */
  readonly shape?: AvatarShape;
  readonly imageClassName?: string;
  readonly imageStyle?: CSSProperties;
  readonly initialsClassName?: string;
  readonly initialsStyle?: CSSProperties;
};

export type AvatarStoryArgs = AvatarProps & { readonly designSystem: DesignSystemId };
