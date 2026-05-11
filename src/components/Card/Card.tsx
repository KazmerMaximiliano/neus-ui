import "./Card.styles.css";
import { CardProps } from "./Card.types";

export const Card = ({
  children,
  variant = "default",
  avatarImage,
  avatarAlt,
  leading,
  trailing,
  fill,
  color,
  icon,
  title,
  description,
  highlighted = false,
  selected = false,
  disabled = false,
  onClick,
}: CardProps) => {
  const isInteractive = Boolean(onClick);

  const classNames = [
    "card",
    variant === "glass" ? "card--glass" : "",
    fill ? "card--fill" : "",
    color ? `card--${color}` : "",
    highlighted ? "card--highlighted" : "",
    selected ? "card--selected" : "",
    disabled ? "card--disabled" : "",
    isInteractive ? "card--interactive" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const Wrapper = isInteractive ? "button" : "div";

  const wrapperProps = isInteractive
    ? {
        type: "button" as const,
        disabled,
        onClick: disabled ? undefined : onClick,
      }
    : {};

  return (
    <Wrapper className={classNames} {...wrapperProps}>
      {(avatarImage || avatarAlt) && (
        <div className="card__avatar-wrapper">
          {avatarImage ? (
            <img src={avatarImage} alt={avatarAlt} className="avatar" />
          ) : (
            <div className="card__avatar-placeholder">
              {avatarAlt ? avatarAlt.charAt(0).toUpperCase() : "A"}
            </div>
          )}
        </div>
      )}

      <div className="card__content">
        {(leading || trailing) && (
          <div className="card__header">
            <div className="card__header-leading">{leading}</div>
            <div className="card__header-trailing">{trailing}</div>
          </div>
        )}

        {(icon || title || description) && (
          <div className="card__slots">
            {icon && <div className="card__slot-icon">{icon}</div>}
            {title && <p className="card__slot-title">{title}</p>}
            {description && <p className="card__slot-description">{description}</p>}
          </div>
        )}

        {children && <div className="card__body">{children}</div>}
      </div>
    </Wrapper>
  );
};
