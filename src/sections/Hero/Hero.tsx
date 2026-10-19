import { useId } from "react";
import { Heading } from "../../components/Heading/Heading";
import { Section } from "../../components/Section/Section";
import { Text } from "../../components/Text/Text";
import "./Hero.styles.css";
import type { HeroProps } from "./Hero.types";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** The opening section of a public page: display headline, lead, the primary action and its anchor. */
export const Hero = ({
  title,
  eyebrow,
  lead,
  actions,
  note,
  media,
  variant = "split",
  titleAs = "h1",
  className,
  bodyClassName,
  bodyStyle,
  eyebrowClassName,
  eyebrowStyle,
  titleClassName,
  titleStyle,
  leadClassName,
  leadStyle,
  actionsClassName,
  actionsStyle,
  noteClassName,
  noteStyle,
  mediaClassName,
  mediaStyle,
  ...props
}: HeroProps) => {
  const titleId = useId();
  const centered = variant === "centered";
  return (
    <Section
      aria-labelledby={titleId}
      {...props}
      className={join("hero", className)}
      contentClassName="hero__layout"
      data-variant={variant}
      data-media={media != null || undefined}
    >
      <div className={join("hero__body", bodyClassName)} style={bodyStyle}>
        {eyebrow != null && (
          <Text as="p" variant="overline" tone="primary" align={centered ? "center" : "start"} measure={false}
            className={join("hero__eyebrow", eyebrowClassName)} style={eyebrowStyle}>
            {eyebrow}
          </Text>
        )}
        <Heading id={titleId} as={titleAs} size="display" align={centered ? "center" : "start"}
          className={join("hero__title", titleClassName)} style={titleStyle}>
          {title}
        </Heading>
        {lead != null && (
          <Text variant="lead" tone="muted" align={centered ? "center" : "start"}
            className={join("hero__lead", leadClassName)} style={leadStyle}>
            {lead}
          </Text>
        )}
        {actions != null && <div className={join("hero__actions", actionsClassName)} style={actionsStyle}>{actions}</div>}
        {note != null && (
          <Text variant="small" tone="muted" align={centered ? "center" : "start"}
            className={join("hero__note", noteClassName)} style={noteStyle}>
            {note}
          </Text>
        )}
      </div>
      {media != null && <div className={join("hero__media", mediaClassName)} style={mediaStyle}>{media}</div>}
    </Section>
  );
};
