import { Heading } from "../../components/Heading/Heading";
import { Text } from "../../components/Text/Text";
import "./SectionHeader.styles.css";
import type { SectionHeaderProps } from "./SectionHeader.types";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** The title block that opens a section: optional eyebrow, title, description and a side action. */
export const SectionHeader = ({
  title,
  eyebrow,
  description,
  actions,
  align = "start",
  titleAs = "h2",
  titleId,
  className,
  eyebrowClassName,
  eyebrowStyle,
  titleClassName,
  titleStyle,
  descriptionClassName,
  descriptionStyle,
  actionsClassName,
  actionsStyle,
  ...props
}: SectionHeaderProps) => (
  <div {...props} className={join("section-header", className)} data-align={align}>
    <div className="section-header__text">
      {eyebrow != null && (
        <Text as="p" variant="overline" tone="primary" align={align} measure={false}
          className={join("section-header__eyebrow", eyebrowClassName)} style={eyebrowStyle}>
          {eyebrow}
        </Text>
      )}
      <Heading id={titleId} as={titleAs} align={align} className={join("section-header__title", titleClassName)} style={titleStyle}>
        {title}
      </Heading>
      {description != null && (
        <Text variant="lead" tone="muted" align={align}
          className={join("section-header__description", descriptionClassName)} style={descriptionStyle}>
          {description}
        </Text>
      )}
    </div>
    {actions != null && <div className={join("section-header__actions", actionsClassName)} style={actionsStyle}>{actions}</div>}
  </div>
);
