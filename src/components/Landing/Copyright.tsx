import { HeartIcon } from "@heroicons/react/24/outline";
import AppLogo from "../../assets/AppLogo";

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="max-w-6xl mx-auto flex flex-col items-center justify-between text-center mt-16">
      <div className="flex flex-col items-center gap-1 text-xs lg:text-sm">
        <AppLogo className="w-40 h-16" />
        <p>
          &copy; {year} VocaRich. Made with{" "}
          <HeartIcon className="w-4 h-4 inline text-red-400 mx-1 -mt-0.5" /> in
          Bangladesh
        </p>
        <p className="text-white/70">PWA • Offline-first • Privacy-focused</p>
      </div>
    </footer>
  );
};

export default Copyright;
