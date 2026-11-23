import type { EmptyStateProps } from "./EmptyState.types";
import "./EmptyState.styles.css";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** Says that a region has no content yet, and what to do about it. */
export const EmptyState = ({
  title,
  titleAs: Title = "h2",
  description,
  media,
  actions,
  className,
  mediaClassName,
  mediaStyle,
  titleClassName,
  titleStyle,
  descriptionClassName,
  descriptionStyle,
  actionsClassName,
  actionsStyle,
  ...props
}: EmptyStateProps) => (
  <div {...props} className={join("empty-state", className)}>
    {media != null && (
      <div className={join("empty-state__media", mediaClassName)} style={mediaStyle}>
        {media}
      </div>
    )}
    <Title className={join("empty-state__title", titleClassName)} style={titleStyle}>
      {title}
    </Title>
    {description != null && (
      <p className={join("empty-state__description", descriptionClassName)} style={descriptionStyle}>
        {description}
      </p>
    )}
    {actions != null && (
      <div className={join("empty-state__actions", actionsClassName)} style={actionsStyle}>
        {actions}
      </div>
    )}
  </div>
);
