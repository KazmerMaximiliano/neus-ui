import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

type LinkType = "primary" | "secondary";

export type LinkProps = Omit<
  ComponentPropsWithRef<"a">,
  "type" | "children" | "style"
> & {
  label: string;
  type?: LinkType;
  style?: CSSProperties | null;
};

export type LinkStoryArgs = LinkProps & {
  designSystem: DesignSystemId;
};
