import { Grid } from "../../components/Grid/Grid";
import { FeatureListContext } from "./FeatureList.context";
import "./FeatureList.styles.css";
import type { FeatureListProps } from "./FeatureList.types";

/** The features or services of a public page, as plain blocks, rows or cards. */
export const FeatureList = ({ children, variant = "grid", columns, className, ...props }: FeatureListProps) => (
  <FeatureListContext.Provider value={variant}>
    <Grid
      {...props}
      as="ul"
      columns={variant === "list" ? 1 : columns}
      gap={variant === "grid" ? 8 : 6}
      className={["feature-list", className].filter(Boolean).join(" ")}
      data-variant={variant}
    >
      {children}
    </Grid>
  </FeatureListContext.Provider>
);
