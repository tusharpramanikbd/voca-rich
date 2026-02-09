import AppLogo from "../assets/AppLogo";

const SplashPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-br from-teal-500 via-blue-500 to-purple-600 px-6">
      <div className="transition-all duration-300 opacity-100 scale-100">
        <AppLogo className="w-48 h-20 mb-8 animate-pulse mx-auto" />
      </div>
    </div>
  );
};

export default SplashPage;
