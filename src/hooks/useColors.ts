import { useTheme } from "../providers/ThemeProvider";
import type { ThemeColors } from "../providers/ThemeProvider";

export const useColors = (): ThemeColors => {
  const { colors } = useTheme();
  return colors;
};
