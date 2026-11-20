import { createContext } from "react";

/** The id DrawerHeader takes, so the drawer is named by its title. */
export const DrawerTitleContext = createContext<string | undefined>(undefined);
