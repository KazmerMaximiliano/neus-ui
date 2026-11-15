import type { ComponentPropsWithRef, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { Responsive } from "../../utils/resolveResponsive";

/** plain: quotes as running text; card: each quote a Card; featured: the first quote large, the rest below. */
export type TestimonialVariant = "plain" | "card" | "featured";

export type TestimonialListProps = Omit<ComponentPropsWithRef<"ul">, "children"> & {
  /** Testimonial elements. */
  readonly children: ReactNode;
  readonly variant?: TestimonialVariant;
  /** Columns; default 1, 2 from 768px and 3 from 1024px. */
  readonly columns?: Responsive<number>;
};

export type TestimonialListStoryArgs = TestimonialListProps & { readonly designSystem: DesignSystemId };
