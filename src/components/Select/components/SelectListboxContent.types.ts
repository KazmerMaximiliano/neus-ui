import type { RefObject } from "react";
import type { SelectListboxProps } from "./SelectListbox.types";

export type SelectListboxContentProps = Omit<
  SelectListboxProps,
  "popover" | "listStyle"
> & {
  id: string;
  panel: RefObject<HTMLDivElement | null>;
  hide: (restoreFocus?: boolean) => void;
};

