import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { IconButtonIcon } from "../IconButton";

export type ChipSize = "small" | "medium";

export type ChipLabels = {
  /** Name of the remove button, from the chip's label. */
  readonly remove?: (label: string) => string;
};

type ChipOwnProps = {
  readonly label: string;
  /** A decorative lucide icon before the label; a selected chip shows a check instead. */
  readonly icon?: IconButtonIcon;
  /** Makes the chip a toggle (controlled). */
  readonly selected?: boolean;
  /** Makes the chip a toggle (uncontrolled). */
  readonly defaultSelected?: boolean;
  readonly onSelectedChange?: (selected: boolean) => void;
  /** Adds a remove button after the label. */
  readonly onRemove?: () => void;
  readonly size?: ChipSize;
  readonly disabled?: boolean;
  /** Built-in texts, in the project's language. */
  readonly labels?: ChipLabels;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly iconClassName?: string;
  readonly iconStyle?: CSSProperties;
  readonly actionClassName?: string;
  readonly actionStyle?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  readonly removeClassName?: string;
  readonly removeStyle?: CSSProperties;
  readonly removeIconClassName?: string;
  readonly removeIconStyle?: CSSProperties;
};

/** Native `<span>` attributes (id, data-*, title…) and its ref, on the root. */
type ChipNativeProps = Omit<
  ComponentPropsWithRef<"span">,
  keyof ChipOwnProps | "children" | "dangerouslySetInnerHTML"
>;

export type ChipProps = ChipOwnProps & ChipNativeProps;

export type ChipStoryArgs = ChipProps & {
  readonly designSystem: DesignSystemId;
  readonly removable: boolean;
  readonly selectable: boolean;
};
