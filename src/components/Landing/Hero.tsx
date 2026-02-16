import AppLogo from "../../assets/AppLogo";

const Hero = () => {
  return (
    <div className="text-center mb-8">
      <AppLogo className="w-[min(80vw,460px)] mx-auto mb-4" />
      <p className="text-2xl lg:text-3xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
        Offline-first vocabulary notebook with daily practice
      </p>
    </div>
  );
};

export default Hero;
