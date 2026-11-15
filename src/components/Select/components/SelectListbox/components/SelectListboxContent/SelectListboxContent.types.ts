import type { RefObject } from "react";
import type { SelectListboxProps } from "../../SelectListbox.types";

export type SelectListboxContentProps = Omit<
  SelectListboxProps,
  "popover" | "listStyle"
> & {
  readonly id: string;
  readonly panel: RefObject<HTMLDivElement | null>;
  readonly hide: (restoreFocus?: boolean) => void;
};

