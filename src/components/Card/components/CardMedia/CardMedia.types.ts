import type { ComponentPropsWithRef, CSSProperties, ElementType, ReactNode } from "react";
import type { DesignSystemId } from "../../../../design-systems";

type VoidElement =
  | "area" | "base" | "br" | "col" | "embed" | "hr" | "img" | "input"
  | "link" | "meta" | "param" | "source" | "track" | "wbr";

export type CardMediaProps<C extends ElementType = "img"> = {
  readonly component?: C;
  readonly className?: string;
  readonly style?: CSSProperties | null;
} & Omit<ComponentPropsWithRef<NoInfer<C>>, "component" | "className" | "style">
  & (C extends VoidElement ? { readonly children?: never } : unknown);

export type CardMediaStoryArgs = {
  readonly designSystem: DesignSystemId;
  readonly component: "img" | "video" | "audio" | "iframe";
  readonly className: string;
  readonly style: CSSProperties | null;
  readonly src: string;
  readonly alt: string;
  readonly title: string;
  readonly controls: boolean;
  readonly poster: string;
  readonly children?: ReactNode;
};
