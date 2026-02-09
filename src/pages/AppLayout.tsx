import { useEffect, useState } from "react";
import useIsPWA from "../hooks/useIsPWA";
import SplashPage from "./SplashPage";
import ModulesPage from "./ModulesPage";

const AppLayout = () => {
  const isPWA = useIsPWA();
  const [showSplash, setShowSplash] = useState(isPWA);

  // Auto-hide splash after 1s for PWA
  useEffect(() => {
    if (isPWA && showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPWA, showSplash]);

  // PWA: Show splash first
  if (showSplash) {
    return <SplashPage />;
  }

  // Show ModulesPage after splash
  return <ModulesPage />;
};

export default AppLayout;
