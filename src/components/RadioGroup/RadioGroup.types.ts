import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps } from "../Input";

export type RadioGroupOrientation = "vertical" | "horizontal";

type RadioGroupOwnProps = FieldDescriptionProps & {
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  readonly requiredClassName?: string;
  readonly requiredStyle?: CSSProperties;
  readonly optionsClassName?: string;
  readonly optionsStyle?: CSSProperties;
  readonly errorClassName?: string;
  readonly errorStyle?: CSSProperties;
  readonly label?: string;
  readonly name?: string;
  /** The selected value; `null` keeps a controlled group with nothing selected. */
  readonly value?: string | null;
  readonly defaultValue?: string;
  readonly orientation?: RadioGroupOrientation;
  readonly error?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly children: ReactNode;
  readonly onChange?: (value: string) => void;
};

/** Native fieldset attributes (id, aria-*, data-*…) and its ref. */
type RadioGroupNativeProps = Omit<
  ComponentPropsWithRef<"fieldset">,
  keyof RadioGroupOwnProps | "role" | "form" | "dangerouslySetInnerHTML"
>;

export type RadioGroupProps = RadioGroupOwnProps & RadioGroupNativeProps;

export type RadioGroupStoryArgs = RadioGroupProps & {
  readonly designSystem: DesignSystemId;
};
