import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

/** Elements a Card may render as; `li` and `figure` keep list and quote semantics. */
export type CardElement = "div" | "article" | "li" | "figure" | "section";

export type CardProps<C extends CardElement = "div"> = Omit<
  ComponentPropsWithRef<NoInfer<C>>,
  "style" | "title" | "color" | "onClick"
> & {
  readonly as?: C;
  readonly variant?: "auto" | "filled" | "outlined" | "elevated";
  readonly style?: CSSProperties | null;
};

export type CardStoryArgs = Omit<CardProps, "as"> & {
  readonly as: CardElement;
  readonly designSystem: DesignSystemId;
};
