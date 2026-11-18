import type { ComponentPropsWithRef, CSSProperties, FocusEvent, PointerEvent, ReactNode, Ref } from "react";
import type { DesignSystemId } from "../../design-systems";

/** What the trigger render function spreads on its Button or IconButton; a Link trigger sets T to HTMLAnchorElement. */
export type TooltipTriggerProps<T extends HTMLElement = HTMLButtonElement> = {
  readonly ref: Ref<T>;
  readonly "aria-describedby": string;
  readonly onPointerEnter: (event: PointerEvent<T>) => void;
  readonly onPointerLeave: () => void;
  readonly onFocus: (event: FocusEvent<T>) => void;
  readonly onBlur: () => void;
};

export type TooltipPlacement = "top" | "bottom";

export type TooltipProps<T extends HTMLElement = HTMLButtonElement> = {
  /** Short text that describes the trigger; it never holds controls. */
  readonly content: ReactNode;
  readonly trigger: (props: TooltipTriggerProps<T>) => ReactNode;
  /** Preferred side, centered on the trigger; it flips when it does not fit. */
  readonly placement?: TooltipPlacement;
  /** Milliseconds the pointer rests on the trigger before the tooltip shows; keyboard focus shows it at once. */
  readonly delay?: number;
  readonly className?: string;
  readonly style?: CSSProperties;
};

/** The bubble Tooltip floats and WeekCalendarRow places at the pointer. */
export type TooltipBubbleProps = Omit<ComponentPropsWithRef<"span">, "role">;

export type TooltipStoryArgs = TooltipProps & {
  readonly designSystem: DesignSystemId;
  readonly triggerLabel: string;
};
