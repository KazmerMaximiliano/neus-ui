// Created by `npx neus init`; this file is yours. Wrap the app once:
//   createRoot(el).render(<NeusRoot><App /></NeusRoot>);
// The theme values come from ./neus.theme.ts, which `npx neus init` rewrites.
import type { ReactNode } from "react";
import { ThemeProvider } from "neus-ui";
import { NEUS_THEME } from "./neus.theme";

export const NeusRoot = ({ children }: { children: ReactNode }) => (
  <ThemeProvider
    designSystem={NEUS_THEME.designSystem}
    initialColorScheme={NEUS_THEME.colorScheme}
    initialTheme={NEUS_THEME.colors}
  >
    {children}
  </ThemeProvider>
);
