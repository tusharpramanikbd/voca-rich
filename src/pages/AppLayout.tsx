import { useEffect, useState } from "react";
import useIsPWA from "../hooks/useIsPWA";
import SplashPage from "./SplashPage";
import ModulesPage from "./ModulesPage";

let hasShownSplash = false;

const AppLayout = () => {
  const isPWA = useIsPWA();
  const [showSplash, setShowSplash] = useState(isPWA);

  // Auto-hide splash after 1s for PWA
  useEffect(() => {
    if (isPWA && showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        hasShownSplash = true;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPWA, showSplash]);

  // PWA: Show splash first
  if (showSplash && !hasShownSplash) {
    return <SplashPage />;
  }

  // Show ModulesPage after splash
  return <ModulesPage />;
};

export default AppLayout;
