// src/pages/AppLayout.tsx
// import { useEffect, useState } from "react";
// import useIsPWA from "../hooks/useIsPWA";
// import SplashPage from "./SplashPage";
import ModulesPage from "./ModulesPage"; // ← IMPORTED!

const AppLayout = () => {
  // const isPWA = useIsPWA();
  // const [showSplash, setShowSplash] = useState(isPWA);

  // Auto-hide splash after 2s for PWA
  // useEffect(() => {
  //   if (isPWA && showSplash) {
  //     const timer = setTimeout(() => {
  //       setShowSplash(false);
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isPWA, showSplash]);

  // PWA: Show splash first
  // if (showSplash) {
  //   return <SplashPage onComplete={() => setShowSplash(false)} />;
  // }

  // Show ModulesPage after splash
  return <ModulesPage />; // ← YOUR ModulesPage!
};

export default AppLayout;
