import { Routes, Route, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import ModulesPage from "./pages/ModulesPage";
import WordsPage from "./pages/WordsPage";
import MobileOnlyGate from "./pages/MobileOnlyGate";
import { useMobileOnlyGate } from "./hooks/useMobileOnlyGate";

const App = () => {
  const { shouldShowGate } = useMobileOnlyGate();
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/app" element={<ModulesPage />} />
        <Route path="/app/m/:module" element={<WordsPage />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
      {shouldShowGate && <MobileOnlyGate />}
    </div>
  );
};

export default App;
