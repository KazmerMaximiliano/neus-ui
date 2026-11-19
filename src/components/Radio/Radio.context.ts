import { createContext } from "react";
import type { RadioContextValue } from "./Radio.types";

/** What a RadioGroup gives the radios inside it; null for a radio on its own. */
export const RadioContext = createContext<RadioContextValue | null>(null);
