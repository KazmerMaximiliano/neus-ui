import type { ComponentPropsWithRef } from "react";

/** The panel element; usePopover gives it its ref, its placement and its open state. */
export type PopoverPanelProps = Omit<ComponentPropsWithRef<"div">, "popover">;
