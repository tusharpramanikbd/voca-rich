import AppLogo from "../../assets/AppLogo";

const Hero = () => {
  return (
    <div className="text-center mb-8">
      <AppLogo className="w-80 h-30 lg:w-130 lg:h-35 mx-auto" />
      <p className="text-2xl lg:text-3xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
        Offline-first vocabulary notebook with daily practice
      </p>
    </div>
  );
};

export default Hero;
