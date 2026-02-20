import { useEffect, useState } from "react";
import SplashPage from "./SplashPage";
import ModulesPage from "./ModulesPage";
import { ModulesModalProvider } from "../providers/ModulesModalProvider";
import usePWAEnvironment from "../hooks/usePWAEnvironment";

let hasShownSplash = false;

const AppLayout = () => {
  const { isIOSPWA } = usePWAEnvironment();
  const [showSplash, setShowSplash] = useState(isIOSPWA);

  // Auto-hide splash after 1s for PWA
  useEffect(() => {
    if (isIOSPWA && showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        hasShownSplash = true;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isIOSPWA, showSplash]);

  // PWA: Show splash first
  if (showSplash && !hasShownSplash) {
    return <SplashPage />;
  }

  // Show ModulesPage after splash
  return (
    <ModulesModalProvider>
      <ModulesPage />
    </ModulesModalProvider>
  );
};

export default AppLayout;
