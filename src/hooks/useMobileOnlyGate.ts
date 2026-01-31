import { useLocation } from "react-router";
import { useBreakpoint } from "./useBreakpoint";

export const useMobileOnlyGate = () => {
  const { pathname } = useLocation();
  const { isDesktop } = useBreakpoint();

  // Show gate on /app routes ONLY
  const shouldShowGate = isDesktop && pathname.startsWith("/app");

  return { shouldShowGate };
};
