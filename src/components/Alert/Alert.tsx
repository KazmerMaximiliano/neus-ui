import { X } from "lucide-react";
import { IconButton } from "../IconButton/IconButton";
import "./Alert.styles.css";
import type { AlertProps } from "./Alert.types";
import { ALERT_ICONS, ALERT_ROLES } from "./Alert.consts";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** An inline message about the page or a task: information, success, a warning or an error. */
export const Alert = ({
  status = "info",
  title,
  children,
  actions,
  icon,
  live = "polite",
  onDismiss,
  dismissLabel,
  className,
  iconClassName,
  iconStyle,
  titleClassName,
  titleStyle,
  contentClassName,
  contentStyle,
  actionsClassName,
  actionsStyle,
  dismissClassName,
  dismissStyle,
  ...props
}: AlertProps) => {
  const StatusIcon = ALERT_ICONS[status];
  const shownIcon = icon === undefined ? <StatusIcon aria-hidden /> : icon;
  return (
    <div {...props} role={ALERT_ROLES[live]} className={join("alert", className)} data-status={status}>
      {shownIcon !== null && (
        <span className={join("alert__icon", iconClassName)} style={iconStyle} aria-hidden>
          {shownIcon}
        </span>
      )}
      <div className="alert__body">
        {title != null && <p className={join("alert__title", titleClassName)} style={titleStyle}>{title}</p>}
        {children != null && <div className={join("alert__content", contentClassName)} style={contentStyle}>{children}</div>}
        {actions != null && <div className={join("alert__actions", actionsClassName)} style={actionsStyle}>{actions}</div>}
      </div>
      {onDismiss && (
        <IconButton
          icon={X}
          label={dismissLabel}
          variant="text"
          size="small"
          className={join("alert__dismiss", dismissClassName)}
          buttonStyle={dismissStyle}
          onClick={onDismiss}
        />
      )}
    </div>
  );
};
