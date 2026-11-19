import type { SelectOption } from "./Select.types";

/** Options whose label contains the query, ignoring case; shared by Select's search and Combobox. */
export const filterOptions = (options: readonly SelectOption[], query: string) =>
  options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));
