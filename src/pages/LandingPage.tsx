import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import QRCode from "../components/Landing/QRCode";
import InstallInstruction from "../components/Landing/InstallInstruction";
import { useBreakpoint } from "../hooks/useBreakpoint";
import InstallPrompt from "../components/Landing/InstallPrompt";
import Copyright from "../components/Landing/Copyright";
import useIsPWA from "../hooks/useIsPWA";

const LandingPage = () => {
  const { isDesktop } = useBreakpoint();
  const isPWA = useIsPWA();

  return (
    <div className="min-h-dvh bg-linear-to-br from-teal-500 via-blue-500 to-purple-600 text-white p-8 lg:p-12">
      <p className="text-center text-sm text-gray-300 mb-4">
        PWA Status: {isPWA ? "Yes" : "No"}
      </p>
      <p className="text-center text-sm text-gray-300 mb-4">
        Testing Version: 5
      </p>
      <div className="max-w-4xl mx-auto mb-16">
        <Hero />
        <Features />
      </div>

      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {isDesktop ? <QRCode /> : <InstallPrompt />}

        <InstallInstruction />
      </div>
      <Copyright />
    </div>
  );
};

export default LandingPage;
