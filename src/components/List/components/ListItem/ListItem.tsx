import type { ListItemProps } from "./ListItem.types";
import "./ListItem.styles.css";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** A row of a List: leading content, a title with an optional description, trailing content. */
export const ListItem = ({
  title,
  description,
  leading,
  trailing,
  children,
  className,
  leadingClassName,
  leadingStyle,
  bodyClassName,
  bodyStyle,
  titleClassName,
  titleStyle,
  descriptionClassName,
  descriptionStyle,
  trailingClassName,
  trailingStyle,
  ...props
}: ListItemProps) => (
  <li {...props} className={join("list-item", className)}>
    {leading != null && (
      <div className={join("list-item__leading", leadingClassName)} style={leadingStyle}>
        {leading}
      </div>
    )}
    <div className={join("list-item__body", bodyClassName)} style={bodyStyle}>
      <div className={join("list-item__title", titleClassName)} style={titleStyle}>
        {title}
      </div>
      {description != null && (
        <div className={join("list-item__description", descriptionClassName)} style={descriptionStyle}>
          {description}
        </div>
      )}
      {children}
    </div>
    {trailing != null && (
      <div className={join("list-item__trailing", trailingClassName)} style={trailingStyle}>
        {trailing}
      </div>
    )}
  </li>
);
