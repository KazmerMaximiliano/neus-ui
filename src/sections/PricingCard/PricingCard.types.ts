import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type PricingCardProps = {
  /** Name of the plan, written as a heading. */
  readonly name: string;
  /** The price as people read it, already formatted in the page's locale ("$12", "12 €", "Free"). */
  readonly price: string;
  /** What the price covers, such as "per month" or "per seat, billed yearly". */
  readonly period?: string;
  readonly description?: ReactNode;
  /** What the plan includes, one short line each. */
  readonly features?: readonly ReactNode[];
  /** The plan's call to action, usually a Button with fullWidth. */
  readonly action?: ReactNode;
  /** Sets the recommended plan apart with the system's featured outline. */
  readonly featured?: boolean;
  /** A short tag beside the name, such as "Most popular". */
  readonly badge?: string;
  readonly nameAs?: "h2" | "h3" | "h4" | "h5" | "h6";
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly headerClassName?: string;
  readonly headerStyle?: CSSProperties;
  readonly nameClassName?: string;
  readonly nameStyle?: CSSProperties;
  readonly priceClassName?: string;
  readonly priceStyle?: CSSProperties;
  readonly descriptionClassName?: string;
  readonly descriptionStyle?: CSSProperties;
  readonly featuresClassName?: string;
  readonly featuresStyle?: CSSProperties;
  readonly featureClassName?: string;
  readonly featureStyle?: CSSProperties;
  readonly actionClassName?: string;
  readonly actionStyle?: CSSProperties;
};

export type PricingCardStoryArgs = PricingCardProps & { readonly designSystem: DesignSystemId };
