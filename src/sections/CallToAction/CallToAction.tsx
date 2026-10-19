import { useId } from "react";
import { Heading } from "../../components/Heading/Heading";
import { Section } from "../../components/Section/Section";
import { Text } from "../../components/Text/Text";
import "./CallToAction.styles.css";
import type { CallToActionProps } from "./CallToAction.types";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** The closing band of a public page: the claim, the action and, in split, a form beside it. */
export const CallToAction = ({
  title,
  text,
  actions,
  aside,
  variant = "band",
  titleAs = "h2",
  tone = "accent",
  className,
  bodyClassName,
  bodyStyle,
  titleClassName,
  titleStyle,
  textClassName,
  textStyle,
  actionsClassName,
  actionsStyle,
  asideClassName,
  asideStyle,
  ...props
}: CallToActionProps) => {
  const titleId = useId();
  const align = variant === "band" ? "center" : "start";
  return (
    <Section
      aria-labelledby={titleId}
      {...props}
      tone={tone}
      className={join("call-to-action", className)}
      contentClassName="call-to-action__layout"
      data-variant={variant}
      data-aside={aside != null || undefined}
    >
      <div className={join("call-to-action__body", bodyClassName)} style={bodyStyle}>
        <Heading id={titleId} as={titleAs} align={align} className={join("call-to-action__title", titleClassName)} style={titleStyle}>
          {title}
        </Heading>
        {text != null && (
          <Text variant="lead" align={align} className={join("call-to-action__text", textClassName)} style={textStyle}>{text}</Text>
        )}
        {actions != null && <div className={join("call-to-action__actions", actionsClassName)} style={actionsStyle}>{actions}</div>}
      </div>
      {aside != null && <div className={join("call-to-action__aside", asideClassName)} style={asideStyle}>{aside}</div>}
    </Section>
  );
};
