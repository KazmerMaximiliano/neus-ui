import { createContext } from "react";
import type { FeatureListVariant } from "./FeatureList.types";

/** The variant a FeatureList gives its items. */
export const FeatureListContext = createContext<FeatureListVariant>("grid");
