import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import QRCode from "../components/Landing/QRCode";
import InstallInstruction from "../components/Landing/InstallInstruction";

const LandingPage = () => {
  return (
    <div className="min-h-dvh bg-linear-to-br from-teal-500 via-blue-500 to-purple-600 text-white p-8 lg:p-12">
      <div className="max-w-4xl mx-auto mb-16">
        <Hero />
        <Features />
      </div>

      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <QRCode />
        <InstallInstruction />
      </div>
    </div>
  );
};

export default LandingPage;
