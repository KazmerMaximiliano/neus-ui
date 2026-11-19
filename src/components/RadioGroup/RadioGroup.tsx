import { useId } from "react";
import { Fieldset } from "../Fieldset";
import { RadioContext } from "../Radio";
import type { RadioGroupProps } from "./RadioGroup.types";
import "./RadioGroup.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

export const RadioGroup = ({
  className,
  labelClassName,
  requiredClassName,
  optionsClassName,
  optionsStyle,
  errorClassName,
  name,
  value,
  defaultValue,
  orientation = "vertical",
  required = false,
  error,
  children,
  onChange,
  ...fieldset
}: RadioGroupProps) => {
  const id = useId();

  return (
    <Fieldset
      {...fieldset}
      className={join("radio-group", className)}
      labelClassName={join("radio-group__label", labelClassName)}
      requiredClassName={join("radio-group__required", requiredClassName)}
      contentClassName={join("radio-group__options", optionsClassName)}
      contentStyle={optionsStyle}
      errorClassName={join("radio-group__error", errorClassName)}
      // The legend still names the fieldset; the role adds the required and invalid states.
      role="radiogroup"
      data-orientation={orientation}
      aria-required={required || undefined}
      aria-invalid={error ? true : undefined}
      required={required}
      error={error}
    >
      <RadioContext.Provider
        value={{ name: name ?? id, value, defaultValue, required, invalid: Boolean(error), onChange }}
      >
        {children}
      </RadioContext.Provider>
    </Fieldset>
  );
};
