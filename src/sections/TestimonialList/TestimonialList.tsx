import { Grid } from "../../components/Grid/Grid";
import { TestimonialListContext } from "./TestimonialList.context";
import "./TestimonialList.styles.css";
import type { TestimonialListProps } from "./TestimonialList.types";

/** Quotes from customers or users, as running text, cards or one featured quote. */
export const TestimonialList = ({ children, variant = "card", columns, className, ...props }: TestimonialListProps) => (
  <TestimonialListContext.Provider value={variant}>
    <Grid
      {...props}
      as="ul"
      columns={columns}
      gap={variant === "plain" ? 8 : 6}
      className={["testimonial-list", className].filter(Boolean).join(" ")}
      data-variant={variant}
    >
      {children}
    </Grid>
  </TestimonialListContext.Provider>
);
