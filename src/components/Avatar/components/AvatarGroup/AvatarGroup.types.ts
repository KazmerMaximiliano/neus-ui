import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../../../design-systems";
import type { AvatarSize } from "../../Avatar.types";

export type AvatarGroupProps = ComponentPropsWithRef<"div"> & {
  /** Avatar elements, in order of importance. */
  readonly children: ReactNode;
  /** Shows this many avatars and a "+N" count for the rest. */
  readonly max?: number;
  /** Size of every avatar in the group. */
  readonly size?: AvatarSize;
  /** Text of the count and its accessible name; defaults to "+N". */
  readonly moreLabel?: (hidden: number) => string;
  readonly moreClassName?: string;
  readonly moreStyle?: CSSProperties;
};

export type AvatarGroupStoryArgs = AvatarGroupProps & { readonly designSystem: DesignSystemId };
