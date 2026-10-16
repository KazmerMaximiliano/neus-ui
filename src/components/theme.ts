import { useTheme } from '../providers';

export const useColors = () => {
  const { colors } = useTheme();
  return colors;
};

export const useColorScheme = () => {
  const { colorScheme } = useTheme();
  return colorScheme;
};