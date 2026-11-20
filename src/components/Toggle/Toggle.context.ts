import { createContext } from "react";
import type { ToggleContextValue } from "./Toggle.types";

/** What a ToggleGroup gives the toggles inside it; null for a toggle on its own. */
export const ToggleContext = createContext<ToggleContextValue | null>(null);
