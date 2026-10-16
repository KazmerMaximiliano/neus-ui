import type { ComponentPropsWithRef, CSSProperties, ElementType, ReactNode } from "react";
import type { DesignSystemId } from "../../../../design-systems";

type VoidElement =
  | "area" | "base" | "br" | "col" | "embed" | "hr" | "img" | "input"
  | "link" | "meta" | "param" | "source" | "track" | "wbr";

export type CardMediaProps<C extends ElementType = "img"> = {
  component?: C;
  className?: string;
  style?: CSSProperties | null;
} & Omit<ComponentPropsWithRef<NoInfer<C>>, "component" | "className" | "style">
  & (C extends VoidElement ? { children?: never } : unknown);

export type CardMediaStoryArgs = {
  designSystem: DesignSystemId;
  component: "img" | "video" | "audio" | "iframe";
  className: string;
  style: CSSProperties | null;
  src: string;
  alt: string;
  title: string;
  controls: boolean;
  poster: string;
  children?: ReactNode;
};
