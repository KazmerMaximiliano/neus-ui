import { Grid } from "../../components/Grid";
import { FeatureListContext } from "./FeatureList.context";
import type { FeatureListProps } from "./FeatureList.types";
import "./FeatureList.styles.css";

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
