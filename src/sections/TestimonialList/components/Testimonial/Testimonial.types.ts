import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../../../design-systems";
import type { TestimonialVariant } from "../../TestimonialList.types";

export type TestimonialProps = {
  /** The words, without quotation marks: the component adds them in the page's language. */
  readonly quote: ReactNode;
  readonly name: ReactNode;
  /** Role, company or relation, such as "Owner of Toto, 6". */
  readonly role?: ReactNode;
  /** An Avatar with alt="" (the name is written beside it). */
  readonly avatar?: ReactNode;
  /** Variant outside a TestimonialList; inside one, the list decides. */
  readonly variant?: TestimonialVariant;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly quoteClassName?: string;
  readonly quoteStyle?: CSSProperties;
  readonly captionClassName?: string;
  readonly captionStyle?: CSSProperties;
  readonly nameClassName?: string;
  readonly nameStyle?: CSSProperties;
  readonly roleClassName?: string;
  readonly roleStyle?: CSSProperties;
};

export type TestimonialStoryArgs = TestimonialProps & { readonly designSystem: DesignSystemId };
