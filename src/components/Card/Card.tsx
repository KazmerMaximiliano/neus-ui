import "./Card.styles.css";
import { CardProps } from "./Card.types";

export const Card = ({
  avatarImage,
  avatarAlt,
  leading,
  trailing,
  children,
  fill,
  color,
}: CardProps) => {
  return (
    <div className={`card${fill ? " card--fill" : ""}${color ? ` card--${color}` : ""}`}>
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
        <div className="card__body">{children}</div>
      </div>
    </div>
  );
};
