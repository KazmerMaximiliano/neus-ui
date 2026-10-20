export type TokenValue = string | number;
export type Declarations = Record<string, TokenValue>;
export type ModeDeclarations = Partial<Record<"base" | "light" | "dark", Declarations>>;

export type DesignDocument = {
  version: "alpha";
  name: string;
  description: string;
  colors: Record<string, string>;
  typography: Record<string, Record<string, TokenValue>>;
  rounded: Record<string, string>;
  spacing: Record<string, TokenValue>;
  components: Record<string, Declarations>;
  "x-neus": {
    id: string;
    palette: Record<"light" | "dark", Declarations>;
    foundations?: ModeDeclarations;
    tokens: ModeDeclarations;
    recipes: Record<string, ModeDeclarations>;
  };
};

export type DerivedDocument = Omit<DesignDocument, "x-neus"> & {
  "x-neus": {
    extends: string;
    tokens?: ModeDeclarations;
    recipes?: Record<string, ModeDeclarations>;
  };
};

export type GenerationResult = {
  artifacts: Map<string, string>;
  warnings: string[];
};
