import { Routes, Route, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import ModulesPage from "./pages/ModulesPage";
import WordsPage from "./pages/WordsPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/app" element={<ModulesPage />} />
        <Route path="/app/m/:module" element={<WordsPage />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </div>
  );
}

export default App;
