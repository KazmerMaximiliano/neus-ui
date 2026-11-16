import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps } from "../Input";

type RadioOwnProps = FieldDescriptionProps & {
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly circleClassName?: string;
  readonly circleStyle?: CSSProperties;
  readonly dotClassName?: string;
  readonly dotStyle?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  readonly value: string;
  readonly label?: string;
  readonly checked?: boolean;
  readonly defaultChecked?: boolean;
  readonly disabled?: boolean;
  /** Called with the radio's value when it becomes the chosen one. */
  readonly onChange?: (value: string) => void;
};

/** Native radio attributes (name, required, form, aria-*, data-*…) and its ref. */
type RadioNativeProps = Omit<
  ComponentPropsWithRef<"input">,
  keyof RadioOwnProps | "type" | "children" | "dangerouslySetInnerHTML"
>;

export type RadioProps = RadioOwnProps & RadioNativeProps;

export type RadioContextValue = {
  readonly name: string;
  readonly value?: string | null;
  readonly defaultValue?: string;
  readonly required: boolean;
  readonly invalid: boolean;
  readonly onChange?: (value: string) => void;
};

export type RadioStoryArgs = RadioProps & {
  readonly designSystem: DesignSystemId;
};
