/** Side of the anchor, then which edges line up: start aligns the leading edges, end the trailing ones. */
export type PopoverPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

/** A side without an edge centers the panel on its anchor, as a tooltip does. */
export type AnchorPlacement = PopoverPlacement | "top" | "bottom";

export type UsePopoverOptions = {
  /** Selector of the element that takes focus when the popover opens. */
  readonly initialFocus?: string;
  /** Preferred placement; it flips to the other side or edge when it does not fit. */
  readonly placement?: AnchorPlacement;
  /** Escape returns focus to the trigger; a tooltip, which never takes focus, turns this off. */
  readonly restoreFocus?: boolean;
  /** Makes the popover controlled; Escape, outside clicks and toggles go through onOpenChange. */
  readonly open?: boolean;
  readonly defaultOpen?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
};

export type PlacementRect = {
  readonly top: number;
  readonly bottom: number;
  readonly left: number;
  readonly right: number;
};

export type PlacementSize = {
  readonly width: number;
  readonly height: number;
};
