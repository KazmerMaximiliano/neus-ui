import { APPLE_METADATA, APPLE_PALETTE } from "./apple/generated/apple.consts";
import { CARBON_METADATA, CARBON_PALETTE } from "./carbon/generated/carbon.consts";
import type { DesignSystem, DesignSystemId, DesignSystemPalette } from "./design-systems.types";
import { MATERIAL_METADATA, MATERIAL_PALETTE } from "./material/generated/material.consts";
import { NEOBRUTALISM_METADATA, NEOBRUTALISM_PALETTE } from "./neobrutalism/generated/neobrutalism.consts";
import { NEUS_METADATA, NEUS_PALETTE } from "./neus/generated/neus.consts";
import { VERCEL_METADATA, VERCEL_PALETTE } from "./vercel/generated/vercel.consts";

export const ADAPTED_COMPONENTS = [
  "Badge", "Button", "Calendar", "Card", "Checkbox", "Clock", "DateInput", "Dropdown",
  "FileUploader", "IconButton", "Input", "Link", "Menu", "Modal", "MultiSelect", "Select",
  "Sidebar", "Stepper", "TimeInput", "WeekCalendar", "WeekCalendarRow", "InteractiveMap",
  "DataTable", "AppTemplate", "FormTemplate", "Heading", "Text", "Container", "Stack", "Grid",
  "Section",
] as const;

export const DESIGN_SYSTEMS: readonly DesignSystem[] = [
  NEUS_METADATA, APPLE_METADATA, CARBON_METADATA, MATERIAL_METADATA,
  NEOBRUTALISM_METADATA, VERCEL_METADATA,
].map(metadata => ({ ...metadata, components: ADAPTED_COMPONENTS }));

export const DESIGN_SYSTEM_PALETTES: Record<DesignSystemId, DesignSystemPalette> = {
  neus: NEUS_PALETTE,
  apple: APPLE_PALETTE,
  carbon: CARBON_PALETTE,
  material: MATERIAL_PALETTE,
  neobrutalism: NEOBRUTALISM_PALETTE,
  vercel: VERCEL_PALETTE,
};
