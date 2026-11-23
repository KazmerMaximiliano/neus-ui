import { useContext, useState } from "react";
import { ToggleContext } from "./Toggle.context";
import type { ToggleProps } from "./Toggle.types";
import "./Toggle.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** A button that stays pressed; inside a ToggleGroup, the group holds what is pressed. */
export const Toggle = ({
  label,
  icon: Icon,
  iconOnly = false,
  pressed,
  defaultPressed = false,
  onPressedChange,
  value,
  size,
  disabled,
  className,
  iconClassName,
  iconStyle,
  labelClassName,
  labelStyle,
  tabIndex,
  onClick,
  onFocus,
  ...native
}: ToggleProps) => {
  const context = useContext(ToggleContext);
  // A toggle without a value is on its own, even inside a group.
  const member = context && value !== undefined ? { group: context, value } : null;
  const [uncontrolled, setUncontrolled] = useState(defaultPressed);
  const on = member ? member.group.value.includes(member.value) : pressed ?? uncontrolled;
  // In a single-choice group the toggles are its radios.
  const radio = member?.group.type === "single";
  const tabStop = member?.group.tabStop;

  return (
    <button
      {...native}
      type="button"
      className={join("toggle", className)}
      data-size={size ?? context?.size ?? "medium"}
      role={radio ? "radio" : native.role}
      aria-pressed={radio ? undefined : on}
      aria-checked={radio ? on : undefined}
      aria-label={iconOnly ? label : native["aria-label"]}
      disabled={disabled ?? context?.disabled}
      tabIndex={tabStop === undefined || tabStop === value ? tabIndex : -1}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (member) {
          if (!(radio && on)) onPressedChange?.(!on);
          member.group.toggle(member.value);
          return;
        }
        if (pressed === undefined) setUncontrolled(!on);
        onPressedChange?.(!on);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        member?.group.focus(member.value);
      }}
    >
      {Icon && <Icon className={join("toggle__icon", iconClassName)} style={iconStyle} aria-hidden />}
      {!iconOnly && (
        <span className={join("toggle__label", labelClassName)} style={labelStyle}>
          {label}
        </span>
      )}
    </button>
  );
};
