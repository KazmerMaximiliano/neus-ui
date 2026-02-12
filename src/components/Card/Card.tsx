import "./Card.styles.css";
import { CardProps } from "./Card.types";

export const Card = ({
  avatarImage,
  avatarAlt,
  header,
  content,
  fill,
  color,
}: CardProps) => {
  return (
    <div className={`card ${fill ? "fill" : ""} ${color ? color : ""}`}>
      {(avatarImage || avatarAlt) && (
        <div className="avatar-wrapper">
          {avatarImage ? (
            <img src={avatarImage} alt={avatarAlt} className="avatar" />
          ) : (
            <div className="avatar-placeholder">
              {avatarAlt ? avatarAlt.charAt(0).toUpperCase() : "A"}
            </div>
          )}
        </div>
      )}

      <div className="content-wrapper">
        {header && (
          <div className="card-header">
            <div className="header-leading">{header?.leading}</div>
            <div className="header-trailing">{header?.trailing}</div>
          </div>
        )}
        <div className="card-body">{content}</div>
      </div>
    </div>
  );
};
