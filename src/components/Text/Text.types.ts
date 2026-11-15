import type { ComponentPropsWithRef } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { HeadingAlign } from "../Heading";

export type TextElement = "p" | "span" | "div" | "small" | "strong";
export type TextVariant = "lead" | "body" | "small" | "caption" | "overline";
export type TextTone = "default" | "muted" | "primary" | "success" | "error";
export type TextWeight = "regular" | "medium" | "semibold";

export type TextProps<C extends TextElement = "p"> = ComponentPropsWithRef<NoInfer<C>> & {
  readonly as?: C;
  readonly variant?: TextVariant;
  /** Text color role; default inherits the surrounding color. */
  readonly tone?: TextTone;
  /** Overrides the variant's weight. */
  readonly weight?: TextWeight;
  readonly align?: HeadingAlign;
  /** Caps the line length at `--text-measure`; on by default for lead and body. */
  readonly measure?: boolean;
  /** Truncates after this many lines. */
  readonly lines?: number;
  /** Tabular figures, so digits align in columns and counters do not shift. */
  readonly numeric?: boolean;
};

export type TextStoryArgs = Omit<TextProps, "as"> & { readonly as: TextElement; readonly designSystem: DesignSystemId };
