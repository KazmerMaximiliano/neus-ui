import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../../../design-systems";
import type { TestimonialVariant } from "../../TestimonialList.types";

export type TestimonialProps = {
  /** The words, without quotation marks: the component adds them in the page's language. */
  quote: ReactNode;
  name: ReactNode;
  /** Role, company or relation, such as "Owner of Toto, 6". */
  role?: ReactNode;
  /** An Avatar with alt="" (the name is written beside it). */
  avatar?: ReactNode;
  /** Variant outside a TestimonialList; inside one, the list decides. */
  variant?: TestimonialVariant;
  className?: string;
  style?: CSSProperties;
  quoteClassName?: string;
  quoteStyle?: CSSProperties;
  captionClassName?: string;
  captionStyle?: CSSProperties;
  nameClassName?: string;
  nameStyle?: CSSProperties;
  roleClassName?: string;
  roleStyle?: CSSProperties;
};

export type TestimonialStoryArgs = TestimonialProps & { designSystem: DesignSystemId };
