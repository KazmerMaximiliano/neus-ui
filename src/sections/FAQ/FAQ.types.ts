import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

/** list: questions over dividers; cards: each question a card. */
export type FAQVariant = "list" | "cards";

export type FAQItem = {
  readonly question: ReactNode;
  readonly answer: ReactNode;
};

export type FAQProps = Omit<ComponentPropsWithRef<"div">, "children" | "defaultValue" | "onChange"> & {
  readonly items: readonly FAQItem[];
  readonly variant?: FAQVariant;
  /** One answer open at a time. */
  readonly single?: boolean;
  /** Heading level of each question; follow the SectionHeader above the list. */
  readonly questionAs?: "h2" | "h3" | "h4" | "h5" | "h6";
  readonly itemClassName?: string;
  readonly itemStyle?: CSSProperties;
  readonly questionClassName?: string;
  readonly questionStyle?: CSSProperties;
  readonly answerClassName?: string;
  readonly answerStyle?: CSSProperties;
};

export type FAQStoryArgs = FAQProps & { readonly designSystem: DesignSystemId };
