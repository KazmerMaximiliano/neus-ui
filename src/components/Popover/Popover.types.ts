import type { CSSProperties, ReactNode, Ref } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { PopoverPlacement } from "../../hooks/usePopover";

/** What the trigger render function spreads on its Button or IconButton. */
export type PopoverTriggerProps = {
  readonly ref: Ref<HTMLButtonElement>;
  readonly "aria-haspopup": "dialog";
  readonly "aria-expanded": boolean;
  readonly "aria-controls": string;
  readonly onClick: () => void;
};

export type PopoverProps = {
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly panelClassName?: string;
  readonly panelStyle?: CSSProperties;
  readonly trigger: (props: PopoverTriggerProps) => ReactNode;
  /** Accessible name of the panel, a non-modal dialog. */
  readonly label: string;
  readonly children: ReactNode;
  readonly placement?: PopoverPlacement;
  readonly open?: boolean;
  readonly defaultOpen?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
};

export type PopoverStoryArgs = PopoverProps & {
  readonly designSystem: DesignSystemId;
  readonly triggerLabel: string;
};
