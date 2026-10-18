import type { ComponentPropsWithRef } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { HeadingAlign } from "../Heading/Heading.types";

export type TextElement = "p" | "span" | "div" | "small" | "strong";
export type TextVariant = "lead" | "body" | "small" | "caption" | "overline";
export type TextTone = "default" | "muted" | "primary" | "success" | "error";
export type TextWeight = "regular" | "medium" | "semibold";

export type TextProps<C extends TextElement = "p"> = ComponentPropsWithRef<NoInfer<C>> & {
  as?: C;
  variant?: TextVariant;
  /** Text color role; default inherits the surrounding color. */
  tone?: TextTone;
  /** Overrides the variant's weight. */
  weight?: TextWeight;
  align?: HeadingAlign;
  /** Caps the line length at `--text-measure`; on by default for lead and body. */
  measure?: boolean;
  /** Truncates after this many lines. */
  lines?: number;
  /** Tabular figures, so digits align in columns and counters do not shift. */
  numeric?: boolean;
};

export type TextStoryArgs = Omit<TextProps, "as"> & { as: TextElement; designSystem: DesignSystemId };
