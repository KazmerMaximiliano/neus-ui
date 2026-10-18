import type { ComponentPropsWithRef } from "react";
import type { DesignSystemId } from "../../design-systems";

export type ContainerElement = "div" | "section" | "header" | "footer" | "main";
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export type ContainerProps<C extends ContainerElement = "div"> = ComponentPropsWithRef<NoInfer<C>> & {
  as?: C;
  /** Maximum width, from `--container-<size>-max-width`; full has none. */
  size?: ContainerSize;
  /** Responsive side padding from `--container-gutter`. */
  gutter?: boolean;
};

export type ContainerStoryArgs = Omit<ContainerProps, "as"> & { as: ContainerElement; designSystem: DesignSystemId };
