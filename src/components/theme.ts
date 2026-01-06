import { useTheme } from '../providers';

/**
 * Hook to get current theme colors dynamically
 * Use this hook to access theme colors in your React components
 */
export const useColors = () => {
  const { colors } = useTheme();
  return colors;
};