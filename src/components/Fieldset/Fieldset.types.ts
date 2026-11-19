import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps } from "../Input";

type FieldsetOwnProps = FieldDescriptionProps & {
  /** The legend that names the group. */
  readonly label?: ReactNode;
  readonly error?: ReactNode;
  /** Shows the required mark; set `required` on the controls inside as well. */
  readonly required?: boolean;
  /** Disables every control inside through the native fieldset. */
  readonly disabled?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  readonly requiredClassName?: string;
  readonly requiredStyle?: CSSProperties;
  readonly contentClassName?: string;
  readonly contentStyle?: CSSProperties;
  readonly errorClassName?: string;
  readonly errorStyle?: CSSProperties;
};

/** Native fieldset attributes (id, name, form, role, aria-*, data-*…) and its ref. */
type FieldsetNativeProps = Omit<
  ComponentPropsWithRef<"fieldset">,
  keyof FieldsetOwnProps | "dangerouslySetInnerHTML"
>;

export type FieldsetProps = FieldsetOwnProps & FieldsetNativeProps;

export type FieldsetStoryArgs = FieldsetProps & {
  readonly designSystem: DesignSystemId;
};
