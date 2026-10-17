import { useSyncExternalStore } from 'react';

interface UseResponsiveReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

const subscribeResize = (notify: () => void) => {
  window.addEventListener('resize', notify);
  return () => window.removeEventListener('resize', notify);
};

export const useResponsive = (): UseResponsiveReturn => {
  // The server snapshot is also used during hydration, so the first client
  // render matches the server HTML before switching to the real width.
  const screenWidth = useSyncExternalStore(subscribeResize, () => window.innerWidth, () => 1024);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
  };
};
