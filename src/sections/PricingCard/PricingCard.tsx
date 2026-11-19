import { useContext } from "react";
import { Check } from "lucide-react";
import { Badge } from "../../components/Badge";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/Card";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { PricingCardContext } from "./PricingCard.context";
import type { PricingCardProps } from "./PricingCard.types";
import "./PricingCard.styles.css";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** One plan: its name, price, what it includes and the action; a list item inside a PricingTable. */
export const PricingCard = ({
  name,
  price,
  period,
  description,
  features = [],
  action,
  featured = false,
  badge,
  nameAs = "h3",
  className,
  style,
  headerClassName,
  headerStyle,
  nameClassName,
  nameStyle,
  priceClassName,
  priceStyle,
  descriptionClassName,
  descriptionStyle,
  featuresClassName,
  featuresStyle,
  featureClassName,
  featureStyle,
  actionClassName,
  actionStyle,
}: PricingCardProps) => {
  const inTable = useContext(PricingCardContext);
  return (
    <Card as={inTable ? "li" : "div"} className={join("pricing-card", className)} style={style} data-featured={featured || undefined}>
      <CardHeader className={join("pricing-card__header", headerClassName)} style={headerStyle}>
        <div className="pricing-card__heading">
          <Heading as={nameAs} size="sm" balance={false} className={join("pricing-card__name", nameClassName)} style={nameStyle}>
            {name}
          </Heading>
          {badge && <Badge label={badge} color="primary" className="pricing-card__badge" />}
        </div>
        <p className={join("pricing-card__price", priceClassName)} style={priceStyle}>
          <span className="pricing-card__amount">{price}</span>
          {period && <span className="pricing-card__period">{period}</span>}
        </p>
        {description != null && (
          <Text tone="muted" className={join("pricing-card__description", descriptionClassName)} style={descriptionStyle}>
            {description}
          </Text>
        )}
      </CardHeader>
      {features.length > 0 && (
        <CardContent className="pricing-card__body">
          <ul className={join("pricing-card__features", featuresClassName)} style={featuresStyle}>
            {features.map((feature, index) => (
              <li key={index} className={join("pricing-card__feature", featureClassName)} style={featureStyle}>
                <Check aria-hidden className="pricing-card__check" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      {action != null && (
        <CardFooter className={join("pricing-card__action", actionClassName)} style={actionStyle}>{action}</CardFooter>
      )}
    </Card>
  );
};
