import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

/** Elements a Card may render as; `li` and `figure` keep list and quote semantics. */
export type CardElement = "div" | "article" | "li" | "figure" | "section";

export type CardProps<C extends CardElement = "div"> = Omit<
  ComponentPropsWithRef<NoInfer<C>>,
  "style" | "title" | "color" | "onClick"
> & {
  as?: C;
  variant?: "auto" | "filled" | "outlined" | "elevated";
  style?: CSSProperties | null;
};

export type CardStoryArgs = Omit<CardProps, "as"> & {
  as: CardElement;
  designSystem: DesignSystemId;
};
