import { Routes, Route, Navigate } from "react-router";
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

  const handleSplashComplete = () => setShowSplash(false);

  return (
    <>
      {/* Splash Screen ONLY for PWA */}
      {showSplash && <SplashPage onComplete={handleSplashComplete} />}

      {/* Main App (ALWAYS renders after splash) */}
      {!showSplash && (
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* PWA: Force /app ALWAYS */}
            {isPWA ? (
              <>
                <Route path="/" element={<Navigate to="/app" replace />} />
                <Route path="/app" element={<ModulesPage />} />
                <Route path="/app/m/:module" element={<WordsPage />} />
                {/* PWA catch-all → /app */}
                <Route path="*" element={<Navigate to="/app" replace />} />
              </>
            ) : (
              // Desktop Browser: Normal flow
              <>
                <Route index element={<LandingPage />} />
                <Route path="/app" element={<ModulesPage />} />
                <Route path="/app/m/:module" element={<WordsPage />} />
                <Route path="*" element={<LandingPage />} />
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
