import { createContext } from "react";
import type { TestimonialVariant } from "./TestimonialList.types";

/** The variant a TestimonialList gives its quotes; undefined outside a list. */
export const TestimonialListContext = createContext<TestimonialVariant | undefined>(undefined);
