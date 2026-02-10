import AppLogo from "../assets/AppLogo";

const SplashPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="transition-all duration-300 opacity-100 scale-100">
        <AppLogo className="w-72 h-40 animate-pulse mx-auto" fill="#2b7fff" />
      </div>
    </div>
  );
};

export default SplashPage;
