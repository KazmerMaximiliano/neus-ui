import type { DesignSystem } from "./design-systems.types";

export const DESIGN_SYSTEMS: readonly DesignSystem[] = [
  {
    id: "neus",
    name: "Neus UI",
    description: "The original Neus UI design and the fallback for all components.",
    source: "src/design-systems/neus/DESIGN.md",
    components: ["Button", "Card", "Input", "Sidebar"],
  },
  {
    id: "apple",
    name: "Apple",
    description: "Action blue, soft corners, and system typography.",
    source: "src/design-systems/apple/DESIGN.md",
    components: ["Button", "Card", "Input", "Sidebar"],
  },
  {
    id: "carbon",
    name: "Carbon",
    description: "Square corners, vivid blue, and precise spacing.",
    source: "src/design-systems/carbon/DESIGN.md",
    components: ["Button", "Card", "Input", "Sidebar"],
  },
  {
    id: "material",
    name: "Material",
    description: "Primary purple, rounded shapes, and subtle elevation.",
    source: "src/design-systems/material/DESIGN.md",
    components: ["Button", "Card", "Input", "Sidebar"],
  },
  {
    id: "neobrutalism",
    name: "Neobrutalism",
    description: "Bright yellow, thick borders, and hard shadows.",
    source: "src/design-systems/neobrutalism/DESIGN.md",
    components: ["Button", "Card", "Input", "Sidebar"],
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Neutral surfaces, small corner radii, and compact typography.",
    source: "src/design-systems/vercel/DESIGN.md",
    components: ["Button", "Card", "Input", "Sidebar"],
  },
];
