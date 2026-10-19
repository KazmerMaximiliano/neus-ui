import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../../../design-systems";
import type { AvatarSize } from "../../Avatar.types";

export type AvatarGroupProps = ComponentPropsWithRef<"div"> & {
  /** Avatar elements, in order of importance. */
  children: ReactNode;
  /** Shows this many avatars and a "+N" count for the rest. */
  max?: number;
  /** Size of every avatar in the group. */
  size?: AvatarSize;
  /** Text of the count and its accessible name; defaults to "+N". */
  moreLabel?: (hidden: number) => string;
  moreClassName?: string;
  moreStyle?: CSSProperties;
};

export type AvatarGroupStoryArgs = AvatarGroupProps & { designSystem: DesignSystemId };
