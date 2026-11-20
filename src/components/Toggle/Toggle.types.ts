import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { IconButtonIcon } from "../IconButton";

export type ToggleSize = "small" | "medium" | "large";

type ToggleOwnProps = {
  /** Visible text, or the accessible name alone with `iconOnly`. */
  readonly label: string;
  readonly icon?: IconButtonIcon;
  readonly iconOnly?: boolean;
  readonly pressed?: boolean;
  readonly defaultPressed?: boolean;
  readonly onPressedChange?: (pressed: boolean) => void;
  /** Identifies the toggle inside a ToggleGroup. */
  readonly value?: string;
  readonly size?: ToggleSize;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly iconClassName?: string;
  readonly iconStyle?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
};

/** Native `<button>` attributes (aria-*, data-*, onClick…) and its ref. */
type ToggleNativeProps = Omit<
  ComponentPropsWithRef<"button">,
  keyof ToggleOwnProps | "type" | "children" | "aria-pressed" | "dangerouslySetInnerHTML"
>;

export type ToggleProps = ToggleOwnProps & ToggleNativeProps;

export type ToggleContextValue = {
  readonly type: "single" | "multiple";
  readonly value: readonly string[];
  /** The toggle that takes Tab; every toggle does while the group cannot tell. */
  readonly tabStop?: string;
  readonly size?: ToggleSize;
  readonly disabled: boolean;
  readonly toggle: (value: string) => void;
  readonly focus: (value: string) => void;
};

export type ToggleStoryArgs = ToggleProps & {
  readonly designSystem: DesignSystemId;
};
