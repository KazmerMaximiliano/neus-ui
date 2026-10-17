import {
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import "../../design-systems/design-systems.css";
import { ThemeContext } from "./ThemeContext";
import "./ThemeProvider.styles.css";
import type {
  ColorScheme,
  ThemeConfig,
  ThemeProviderProps,
} from "./ThemeProvider.types";
import { applyTheme, resolveTheme } from "./ThemeProvider.utils";

export const ThemeProvider = ({
  children,
  designSystem: selectedSystem,
  initialTheme = {},
  initialColorScheme,
  colorScheme: controlledScheme,
  scope,
  className,
}: ThemeProviderProps) => {
  const parent = useContext(ThemeContext);
  const [overrides, setOverrides] = useState<ThemeConfig>(initialTheme);
  const [localScheme, setColorScheme] = useState<ColorScheme | undefined>(
    initialColorScheme,
  );
  const designSystem = selectedSystem ?? parent?.designSystem ?? "neus";
  const colorScheme =
    controlledScheme ?? localScheme ?? parent?.colorScheme ?? "light";
  const isLocal = Boolean(parent) || scope === "local";
  const { colors, variables } = useMemo(
    () => resolveTheme(designSystem, colorScheme, overrides),
    [designSystem, colorScheme, overrides],
  );

  // Layout effect: the global attributes land before the first paint (no-op on the server).
  useLayoutEffect(() => {
    if (!isLocal) {
      return applyTheme(
        document.documentElement,
        designSystem,
        colorScheme,
        variables,
      );
    }
  }, [isLocal, designSystem, colorScheme, variables]);

  const updateTheme = (config: ThemeConfig) => {
    setOverrides((previous) => ({ ...previous, ...config }));
  };

  return (
    <ThemeContext.Provider
      value={{ colors, updateTheme, colorScheme, setColorScheme, designSystem }}
    >
      {isLocal ? (
        <div
          className={["neus-theme-scope", className].filter(Boolean).join(" ")}
          data-design-system={designSystem}
          data-color-scheme={colorScheme}
          style={variables as CSSProperties}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
};
