import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps } from "../Input";

/** What FormField hands its control: spread it on the element that takes the value. */
export type FormFieldControl = {
  id: string;
  "aria-labelledby": string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  "aria-required"?: true;
  disabled?: true;
};

export type FormFieldProps = FieldDescriptionProps & {
  readonly label: ReactNode;
  readonly error?: ReactNode;
  readonly required?: boolean;
  readonly disabled?: boolean;
  /** The control's id; generated when omitted. */
  readonly id?: string;
  readonly children: (control: FormFieldControl) => ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  readonly requiredClassName?: string;
  readonly requiredStyle?: CSSProperties;
  readonly errorClassName?: string;
  readonly errorStyle?: CSSProperties;
};

export type FormFieldStoryArgs = FormFieldProps & {
  readonly designSystem: DesignSystemId;
};
