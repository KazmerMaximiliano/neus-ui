import { createElement, type MouseEvent } from "react";
import { BeatLoader } from "react-spinners";
import "./Button.styles.css";
import type { ButtonProps } from "./Button.types";
import { getButtonClasses } from "./Button.utils";

export const Button = (props: ButtonProps) => {
  const {
    className,
    labelClassName,
    loaderClassName,
    label,
    variant = "solid",
    color = "primary",
    size = "medium",
    fullWidth = false,
    disabled = false,
    loading = false,
    buttonStyle,
    labelStyle,
    loaderStyle,
  } = props;
  const inactive = disabled || loading;
  const shared = {
    className: [getButtonClasses(variant, color, size, fullWidth), className].filter(Boolean).join(" "),
    style: buttonStyle,
    "aria-busy": loading || undefined,
    "aria-label": loading ? label : undefined,
  };
  const content = (
    <>
      <span
        className={["button-label", labelClassName].filter(Boolean).join(" ")}
        style={labelStyle}
        aria-hidden={loading || undefined}
      >
        {label}
      </span>
      {loading && (
        <BeatLoader
          className={["button-loader", loaderClassName]
            .filter(Boolean)
            .join(" ")}
          size="1em"
          margin="0.333333em"
          color="currentColor"
          speedMultiplier={0.5}
          style={loaderStyle}
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    const { href, linkComponent = "a", target, rel, onClick } = props;
    // An inactive link drops its href (and the router link), keeping a link role that reports itself disabled.
    return createElement(
      inactive ? "a" : linkComponent,
      {
        ...shared,
        href: inactive ? undefined : href,
        target,
        rel,
        role: inactive ? "link" : undefined,
        "aria-disabled": inactive || undefined,
        onClick: (e: MouseEvent<HTMLAnchorElement>) => {
          if (inactive) e.preventDefault();
          else onClick?.(e);
        },
      },
      content,
    );
  }

  const { type = "button", onClick } = props;
  return (
    <button {...shared} onClick={(e) => onClick?.(e)} type={type} disabled={inactive}>
      {content}
    </button>
  );
};
