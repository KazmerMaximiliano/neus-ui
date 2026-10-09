export type DesignSystemId =
  | "neus"
  | "apple"
  | "carbon"
  | "material"
  | "neobrutalism"
  | "vercel";

export type DesignSystem = {
  id: DesignSystemId;
  name: string;
  description: string;
  source: string;
  components: readonly string[];
};

export type ActionPalette = {
  primary: string;
  onPrimary: string;
  hover?: string;
  active?: string;
  focus?: string;
  success?: string;
  error?: string;
  info?: string;
};

export type DesignSystemPalette = {
  light: ActionPalette;
  dark: ActionPalette;
};
