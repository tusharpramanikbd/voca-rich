import { useState, useEffect } from "react";

const DEFAULT_BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] =
    useState<keyof typeof DEFAULT_BREAKPOINTS>("xs");

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      let found: keyof typeof DEFAULT_BREAKPOINTS = "xs";

      // Check CSS vars first
      const root = getComputedStyle(document.documentElement);
      for (const key of Object.keys(
        DEFAULT_BREAKPOINTS,
      ) as (keyof typeof DEFAULT_BREAKPOINTS)[]) {
        const breakpointPx = root
          .getPropertyValue(`--breakpoint-${key}`)
          ?.trim();
        if (breakpointPx && width >= parseInt(breakpointPx)) {
          found = key;
        }
      }

      // Fallback to defaults
      for (const [key, minWidth] of Object.entries(DEFAULT_BREAKPOINTS)) {
        if (width >= minWidth) {
          found = key as keyof typeof DEFAULT_BREAKPOINTS;
        }
      }

      setBreakpoint(found);
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isDesktop:
      breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl",
    isMobile: breakpoint === "xs" || breakpoint === "sm",
    isTablet: breakpoint === "md",
  };
};
