import { Routes, Route, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import WordsPage from "./pages/WordsPage";
import MobileOnlyGate from "./pages/MobileOnlyGate";
import { useMobileOnlyGate } from "./hooks/useMobileOnlyGate";
import AppLayout from "./pages/AppLayout";
import ChallengePage from "./pages/ChallengePage";
import usePWAEnvironment from "./hooks/usePWAEnvironment";

const App = () => {
  const { shouldShowGate } = useMobileOnlyGate();
  const { isPWA } = usePWAEnvironment();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {isPWA ? (
          <>
            <Route path="/" element={<Navigate to="/app" replace />} />
            <Route path="/app/*" element={<AppLayout />} />
            <Route path="/app/m/:module" element={<WordsPage />} />
            <Route
              path="/app/m/:module/challenge"
              element={<ChallengePage />}
            />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </>
        ) : (
          // Browser: Normal landing + app
          <>
            <Route index element={<LandingPage />} />
            <Route path="/app/*" element={<AppLayout />} />
            <Route path="/app/m/:module" element={<WordsPage />} />
            <Route
              path="/app/m/:module/challenge"
              element={<ChallengePage />}
            />
            <Route path="*" element={<LandingPage />} />
          </>
        )}
      </Routes>

      {/* Mobile gate */}
      {shouldShowGate && <MobileOnlyGate />}
    </div>
  );
};

export default App;
