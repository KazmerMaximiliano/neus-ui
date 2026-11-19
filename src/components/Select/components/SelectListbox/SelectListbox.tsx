import { PopoverPanel } from "../../../Popover/components/PopoverPanel";
import { SelectListboxContent } from "./components/SelectListboxContent";
import type { SelectListboxProps } from "./SelectListbox.types";

export const SelectListbox = ({
  listClassName,
  popover: { id, open, popoverRef, hide },
  listStyle,
  ...props
}: SelectListboxProps) => (
  <PopoverPanel
    ref={popoverRef}
    className={["select__popover", listClassName].filter(Boolean).join(" ")}
    style={listStyle}
  >
    {open && (
      <SelectListboxContent id={id} panel={popoverRef} hide={hide} {...props} />
    )}
  </PopoverPanel>
);

