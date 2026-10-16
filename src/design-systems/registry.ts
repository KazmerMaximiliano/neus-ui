import type { DesignSystem } from "./design-systems.types";

/** Components with a Neus contract and a recipe in every system. */
const ADAPTED_COMPONENTS = ["Badge", "Button", "Calendar", "Card", "Checkbox", "Clock", "DateInput", "Dropdown", "FileUploader", "IconButton", "Input", "Link", "Menu", "Modal", "MultiSelect", "Select", "Sidebar", "Stepper", "TimeInput", "WeekCalendar", "WeekCalendarRow", "InteractiveMap", "DataTable", "AppTemplate", "FormTemplate"] as const;

export const DESIGN_SYSTEMS: readonly DesignSystem[] = [
  {
    id: "neus",
    name: "Neus UI",
    description: "The original Neus UI design and the fallback for all components.",
    source: "src/design-systems/neus/DESIGN.md",
    components: ADAPTED_COMPONENTS,
  },
  {
    id: "apple",
    name: "Apple",
    description: "Action blue, soft corners, and system typography.",
    source: "src/design-systems/apple/DESIGN.md",
    components: ADAPTED_COMPONENTS,
  },
  {
    id: "carbon",
    name: "Carbon",
    description: "Square corners, vivid blue, and precise spacing.",
    source: "src/design-systems/carbon/DESIGN.md",
    components: ADAPTED_COMPONENTS,
  },
  {
    id: "material",
    name: "Material",
    description: "Primary purple, rounded shapes, and subtle elevation.",
    source: "src/design-systems/material/DESIGN.md",
    components: ADAPTED_COMPONENTS,
  },
  {
    id: "neobrutalism",
    name: "Neobrutalism",
    description: "Bright yellow, thick borders, and hard shadows.",
    source: "src/design-systems/neobrutalism/DESIGN.md",
    components: ADAPTED_COMPONENTS,
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Neutral surfaces, small corner radii, and compact typography.",
    source: "src/design-systems/vercel/DESIGN.md",
    components: ADAPTED_COMPONENTS,
  },
];
