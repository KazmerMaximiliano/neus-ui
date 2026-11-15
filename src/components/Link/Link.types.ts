import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

type LinkType = "primary" | "secondary";

export type LinkProps = Omit<
  ComponentPropsWithRef<"a">,
  "type" | "children" | "style"
> & {
  readonly label: string;
  readonly type?: LinkType;
  readonly style?: CSSProperties | null;
};

export type LinkStoryArgs = LinkProps & {
  readonly designSystem: DesignSystemId;
};
