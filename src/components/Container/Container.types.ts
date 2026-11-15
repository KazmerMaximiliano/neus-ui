import type { ComponentPropsWithRef } from "react";
import type { DesignSystemId } from "../../design-systems";

export type ContainerElement = "div" | "section" | "header" | "footer" | "main";
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export type ContainerProps<C extends ContainerElement = "div"> = ComponentPropsWithRef<NoInfer<C>> & {
  readonly as?: C;
  /** Maximum width, from `--container-<size>-max-width`; full has none. */
  readonly size?: ContainerSize;
  /** Responsive side padding from `--container-gutter`. */
  readonly gutter?: boolean;
};

export type ContainerStoryArgs = Omit<ContainerProps, "as"> & { readonly as: ContainerElement; readonly designSystem: DesignSystemId };
