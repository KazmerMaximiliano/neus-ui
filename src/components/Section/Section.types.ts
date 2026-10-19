import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { ContainerSize } from "../Container/Container.types";

export type SectionElement = "section" | "div" | "header" | "footer" | "aside";
export type SectionTone = "default" | "subtle" | "accent" | "brand" | "inverse";
export type SectionSpacing = "sm" | "md" | "lg";

export type SectionProps<C extends SectionElement = "section"> = ComponentPropsWithRef<NoInfer<C>> & {
  as?: C;
  /**
   * Band background; alternate default and subtle to separate sections without rules. brand fills the band
   * with the primary color and inverse with the ink: use them once or twice per page.
   */
  tone?: SectionTone;
  /** Vertical padding of the band. */
  spacing?: SectionSpacing;
  /** Wraps the content in a Container of this size; false renders the children directly. */
  container?: ContainerSize | false;
  contentClassName?: string;
  contentStyle?: CSSProperties;
};

export type SectionStoryArgs = Omit<SectionProps, "as"> & { as: SectionElement; designSystem: DesignSystemId };
