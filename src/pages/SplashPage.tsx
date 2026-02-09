import AppLogo from "../assets/AppLogo";

const SplashPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-br from-teal-500 via-blue-500 to-purple-600 px-6">
      <div className={`transition-all duration-300 opacity-100 scale-100`}>
        <AppLogo className="w-48 h-20 mb-8 animate-pulse mx-auto" />
        <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl animate-spin-slow shadow-2xl border border-white/30 mx-auto mb-6" />
      </div>
    </div>
  );
};

export default SplashPage;
