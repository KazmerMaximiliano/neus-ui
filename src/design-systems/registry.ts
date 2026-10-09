import type { DesignSystem } from "./design-systems.types";

export const DESIGN_SYSTEMS: readonly DesignSystem[] = [
  {
    id: "neus",
    name: "Neus UI",
    description: "The original Neus UI design and the fallback for all components.",
    source: "src/design-systems/neus/",
    components: ["Button"],
  },
  {
    id: "apple",
    name: "Apple",
    description: "Action blue, soft corners, and system typography.",
    source: "design-systems/apple.md",
    components: ["Button"],
  },
  {
    id: "carbon",
    name: "Carbon",
    description: "Square corners, vivid blue, and precise spacing.",
    source: "design-systems/ibmcarbon.md",
    components: ["Button"],
  },
  {
    id: "material",
    name: "Material",
    description: "Primary purple, rounded shapes, and subtle elevation.",
    source: "design-systems/material.md",
    components: ["Button"],
  },
  {
    id: "neobrutalism",
    name: "Neobrutalism",
    description: "Bright yellow, thick borders, and hard shadows.",
    source: "design-systems/neobrutalism.md",
    components: ["Button"],
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Neutral surfaces, small corner radii, and compact typography.",
    source: "design-systems/vercel.md",
    components: ["Button"],
  },
];
