import { useEffect, useRef, useState } from "react";
import { Alert } from "../Alert";
import type { ToastProps } from "./Toast.types";
import "./Toast.styles.css";

/** A brief notification over the page: an Alert that can close itself after a while. */
export const Toast = ({
  duration,
  className,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: ToastProps) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const remaining = useRef(duration);
  const { onDismiss } = props;
  const paused = hovered || focused;

  // The timer restarts on every render with the time it has left, so pausing keeps the rest.
  useEffect(() => {
    const left = remaining.current;
    if (left == null || !onDismiss || paused) return;
    const started = Date.now();
    const timer = setTimeout(onDismiss, left);
    return () => {
      clearTimeout(timer);
      remaining.current = left - (Date.now() - started);
    };
  }, [onDismiss, paused]);

  return (
    <Alert
      {...props}
      live="off"
      className={["toast", className].filter(Boolean).join(" ")}
      onMouseEnter={(event) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        setFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        onBlur?.(event);
      }}
    />
  );
};
