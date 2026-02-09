import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import WordsPage from "./pages/WordsPage";
import MobileOnlyGate from "./pages/MobileOnlyGate";
import { useMobileOnlyGate } from "./hooks/useMobileOnlyGate";
// import useIsPWA from "./hooks/useIsPWA";
import AppLayout from "./pages/AppLayout";

const App = () => {
  const { shouldShowGate } = useMobileOnlyGate();
  // const isPWA = useIsPWA();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/app/*" element={<AppLayout />} />
        <Route path="/app/m/:module" element={<WordsPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>

      {/* Mobile gate */}
      {shouldShowGate && <MobileOnlyGate />}
    </div>
  );
};

// {!isPWA ? (
//           <>
//             <Route path="/" element={<Navigate to="/app" replace />} />
//             <Route path="/app/*" element={<AppLayout />} />
//             <Route path="/app/m/:module" element={<WordsPage />} />
//             <Route path="*" element={<Navigate to="/app" replace />} />
//           </>
//         ) : (
//           // Browser: Normal landing + app
//           <>
//             <Route index element={<LandingPage />} />
//             <Route path="/app/*" element={<AppLayout />} />
//             <Route path="/app/m/:module" element={<WordsPage />} />
//             <Route path="*" element={<LandingPage />} />
//           </>
//         )}

export default App;
