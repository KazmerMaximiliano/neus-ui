import { Grid } from "../../components/Grid";
import { PricingCardContext } from "../PricingCard";
import type { PricingTableProps } from "./PricingTable.types";

/** The plans of a product side by side, as a list of PricingCards whose actions line up. */
export const PricingTable = ({ children, columns, className, ...props }: PricingTableProps) => (
  <PricingCardContext.Provider value>
    <Grid {...props} as="ul" columns={columns} gap={6} className={["pricing-table", className].filter(Boolean).join(" ")}>
      {children}
    </Grid>
  </PricingCardContext.Provider>
);
