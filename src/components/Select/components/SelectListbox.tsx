import { SelectListboxContent } from "./SelectListboxContent";
import type { SelectListboxProps } from "./SelectListbox.types";

export const SelectListbox = ({
  listClassName,
  popover: { id, open, popoverRef, hide },
  listStyle,
  ...props
}: SelectListboxProps) => (
  <div
    ref={popoverRef}
    popover="manual"
    className={["select__popover", listClassName].filter(Boolean).join(" ")}
    style={listStyle}
  >
    {open && (
      <SelectListboxContent id={id} panel={popoverRef} hide={hide} {...props} />
    )}
  </div>
);

