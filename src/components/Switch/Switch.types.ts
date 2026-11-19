import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps } from "../Input";

type SwitchOwnProps = FieldDescriptionProps & {
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  readonly trackClassName?: string;
  readonly trackStyle?: CSSProperties;
  readonly thumbClassName?: string;
  readonly thumbStyle?: CSSProperties;
  readonly label?: string;
  readonly checked?: boolean;
  readonly defaultChecked?: boolean;
  readonly disabled?: boolean;
  readonly onChange?: (checked: boolean) => void;
};

/** Native checkbox attributes (name, value, required, form, aria-*, data-*…) and its ref. */
type SwitchNativeProps = Omit<
  ComponentPropsWithRef<"input">,
  keyof SwitchOwnProps | "type" | "role" | "children" | "dangerouslySetInnerHTML"
>;

export type SwitchProps = SwitchOwnProps & SwitchNativeProps;

export type SwitchStoryArgs = SwitchProps & {
  readonly designSystem: DesignSystemId;
};
