import AppLogo from "../assets/AppLogo";

const SplashPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-br from-teal-500 via-blue-500 to-purple-600 px-6 m-2 rounded-3xl shadow-lg">
      <div className="transition-all duration-300 opacity-100 scale-100">
        <AppLogo className="w-72 h-40 animate-pulse mx-auto" />
      </div>
    </div>
  );
};

export default SplashPage;
