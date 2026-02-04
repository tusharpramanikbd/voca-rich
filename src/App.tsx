import { Routes, Route, Navigate, useLocation } from "react-router";
import LandingPage from "./pages/LandingPage";
import ModulesPage from "./pages/ModulesPage";
import WordsPage from "./pages/WordsPage";
import MobileOnlyGate from "./pages/MobileOnlyGate";
import { useMobileOnlyGate } from "./hooks/useMobileOnlyGate";
import useIsPWA from "./hooks/useIsPWA";
import { useState } from "react";
import SplashPage from "./pages/SplashPage";

const App = () => {
  const { shouldShowGate } = useMobileOnlyGate();
  const isPWA = useIsPWA();
  const [showSplash, setShowSplash] = useState(isPWA);
  const location = useLocation();

  const handleSplashComplete = () => setShowSplash(false);

  // PWA always goes to /app (skip landing)
  const redirectToApp = isPWA || location.pathname === "/";

  return (
    <>
      {/* Splash Screen (PWA + first load) */}
      {showSplash && <SplashPage onComplete={handleSplashComplete} />}

      {!showSplash && (
        <div className={`min-h-screen ${redirectToApp ? "bg-gray-50" : ""}`}>
          <Routes>
            {/* PWA: Always app routes */}
            {isPWA ? (
              <>
                <Route path="/" element={<Navigate to="/app" replace />} />
                <Route path="/app" element={<ModulesPage />} />
                <Route path="/app/m/:module" element={<WordsPage />} />
                <Route path="*" element={<Navigate to="/app" replace />} />
              </>
            ) : (
              // Browser: Landing + app
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<ModulesPage />} />
                <Route path="/app/m/:module" element={<WordsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>

          {/* Mobile gate (app routes only) */}
          {shouldShowGate && <MobileOnlyGate />}
        </div>
      )}
    </>
  );
};

export default App;
