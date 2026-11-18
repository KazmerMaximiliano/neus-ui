import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type FieldPresentationProps = {
  readonly variant?: "auto" | "filled" | "outlined";
  readonly labelPlacement?: "auto" | "external" | "floating";
  readonly size?: "small" | "medium" | "large";
};

/** Help text below a field, announced with it through aria-describedby. */
export type FieldDescriptionProps = {
  readonly description?: ReactNode;
  readonly descriptionClassName?: string;
  readonly descriptionStyle?: CSSProperties;
};

type InputOwnProps = FieldPresentationProps & FieldDescriptionProps & {
  readonly className?: string;
  readonly controlClassName?: string;
  readonly controlStyle?: CSSProperties;
  readonly errorClassName?: string;
  readonly errorIconClassName?: string;
  readonly inputClassName?: string;
  readonly labelClassName?: string;
  readonly prefixClassName?: string;
  readonly requiredClassName?: string;
  readonly suffixClassName?: string;
  readonly prefix?: ReactNode;
  readonly suffix?: ReactNode;
  readonly errorIcon?: ReactNode;
  readonly prefixStyle?: CSSProperties;
  readonly suffixStyle?: CSSProperties;
  readonly errorIconStyle?: CSSProperties;
  readonly id?: string;
  readonly "aria-label"?: string;
  readonly name?: string;
  readonly value?: string | number;
  readonly defaultValue?: string | number;
  readonly placeholder?: string;
  readonly label?: string;
  readonly error?: string;
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly required?: boolean;
  readonly type?: "text" | "password" | "email" | "number" | "color" | "tel" | "url";
  readonly min?: string | number;
  readonly max?: string | number;
  readonly step?: string | number;
  readonly wrapperStyle?: CSSProperties;
  readonly inputStyle?: CSSProperties;
  readonly labelStyle?: CSSProperties;
  readonly requiredStyle?: CSSProperties;
  readonly errorStyle?: CSSProperties;
  readonly onChange?: (value: string) => void;
};

/** Native `<input>` attributes (autoComplete, inputMode, spellCheck, pattern, aria-*, data-*…) and ref, not replaced by Input's own API. */
type InputNativeProps = Omit<
  ComponentPropsWithRef<"input">,
  keyof InputOwnProps | "style" | "readOnly" | "children" | "dangerouslySetInnerHTML"
>;

export type InputProps = InputOwnProps & InputNativeProps;

export type InputStoryArgs = InputProps & {
  readonly designSystem: DesignSystemId;
};

export type InputStoryState = {
  value: InputProps["value"];
  argsValue: InputProps["value"];
  pendingValues: string[];
};

export type InputStoryPreviewProps = InputStoryArgs & {
  readonly updateArgs: (args: Partial<InputStoryArgs>) => void;
};
