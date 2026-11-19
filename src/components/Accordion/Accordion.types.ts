import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

/** single: opening an item closes the open one; multiple: items open independently. */
export type AccordionType = "single" | "multiple";

export type AccordionItem = {
  readonly value: string;
  readonly title: ReactNode;
  readonly content: ReactNode;
  /** Keeps the item as it is, open or closed. */
  readonly disabled?: boolean;
};

export type AccordionProps = Omit<ComponentPropsWithRef<"div">, "children" | "onChange" | "defaultValue"> & {
  readonly items: readonly AccordionItem[];
  readonly type?: AccordionType;
  /** The open items (controlled). */
  readonly value?: readonly string[];
  /** The items open first (uncontrolled). */
  readonly defaultValue?: readonly string[];
  readonly onChange?: (value: string[]) => void;
  /** Wraps each title in a heading of this level, so the titles are in the page outline. */
  readonly titleAs?: "h2" | "h3" | "h4" | "h5" | "h6";
  readonly itemClassName?: string;
  readonly itemStyle?: CSSProperties;
  readonly headerClassName?: string;
  readonly headerStyle?: CSSProperties;
  readonly contentClassName?: string;
  readonly contentStyle?: CSSProperties;
};

export type AccordionStoryArgs = AccordionProps & {
  readonly designSystem: DesignSystemId;
};
