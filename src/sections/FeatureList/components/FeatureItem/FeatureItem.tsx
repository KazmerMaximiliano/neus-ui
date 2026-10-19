import { useContext } from "react";
import { Card } from "../../../../components/Card/Card";
import { CardContent } from "../../../../components/Card/components/CardContent/CardContent";
import { CardHeader } from "../../../../components/Card/components/CardHeader/CardHeader";
import { Heading } from "../../../../components/Heading/Heading";
import { Text } from "../../../../components/Text/Text";
import { FeatureListContext } from "../../FeatureList.context";
import "./FeatureItem.styles.css";
import type { FeatureItemProps } from "./FeatureItem.types";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** One feature or service of a FeatureList, laid out by the list's variant. */
export const FeatureItem = ({
  icon,
  title,
  children,
  action,
  titleAs = "h3",
  className,
  style,
  iconClassName,
  iconStyle,
  titleClassName,
  titleStyle,
  descriptionClassName,
  descriptionStyle,
  actionClassName,
  actionStyle,
}: FeatureItemProps) => {
  const variant = useContext(FeatureListContext);
  const iconTile = icon != null && (
    <span aria-hidden className={join("feature-item__icon", iconClassName)} style={iconStyle}>{icon}</span>
  );
  const heading = (
    <Heading as={titleAs} size="sm" balance={false} className={join("feature-item__title", titleClassName)} style={titleStyle}>
      {title}
    </Heading>
  );
  const details = (
    <>
      {children != null && (
        <Text tone="muted" className={join("feature-item__description", descriptionClassName)} style={descriptionStyle}>
          {children}
        </Text>
      )}
      {action != null && <div className={join("feature-item__action", actionClassName)} style={actionStyle}>{action}</div>}
    </>
  );

  if (variant === "cards") {
    return (
      <Card as="li" className={join("feature-item", className)} style={style} data-variant-item="cards">
        <CardHeader className="feature-item__header">{iconTile}{heading}</CardHeader>
        <CardContent className="feature-item__body">{details}</CardContent>
      </Card>
    );
  }
  return (
    <li className={join("feature-item", className)} style={style} data-variant-item={variant}>
      <div className="feature-item__header">{iconTile}{heading}</div>
      <div className="feature-item__body">{details}</div>
    </li>
  );
};
