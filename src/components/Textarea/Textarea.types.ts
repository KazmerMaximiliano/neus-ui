import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps, FieldPresentationProps } from "../Input";

type TextareaOwnProps = FieldPresentationProps & FieldDescriptionProps & {
  readonly className?: string;
  readonly wrapperStyle?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  readonly requiredClassName?: string;
  readonly requiredStyle?: CSSProperties;
  readonly textareaClassName?: string;
  readonly textareaStyle?: CSSProperties;
  readonly errorClassName?: string;
  readonly errorStyle?: CSSProperties;
  readonly id?: string;
  readonly label?: string;
  readonly error?: string;
  readonly placeholder?: string;
  readonly value?: string;
  readonly defaultValue?: string;
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly required?: boolean;
  readonly rows?: number;
  readonly maxRows?: number;
  readonly autoResize?: boolean;
  readonly onChange?: (value: string) => void;
};

/** Native `<textarea>` attributes (name, maxLength, autoComplete, spellCheck, aria-*, data-*…) and its ref. */
type TextareaNativeProps = Omit<
  ComponentPropsWithRef<"textarea">,
  keyof TextareaOwnProps | "style" | "readOnly" | "children" | "dangerouslySetInnerHTML"
>;

export type TextareaProps = TextareaOwnProps & TextareaNativeProps;

export type TextareaStoryArgs = TextareaProps & {
  readonly designSystem: DesignSystemId;
};
