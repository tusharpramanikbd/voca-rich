import {
  DevicePhoneMobileIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import useInstallPrompt from "../../hooks/useInstallPrompt";

const InstallPrompt = () => {
  const isAndroid = /Android.*Chrome/i.test(navigator.userAgent);

  const { deferredPrompt, handleInstall } = useInstallPrompt();

  return (
    <div className="space-y-4 px-4">
      {deferredPrompt && isAndroid ? (
        // Android: Native install prompt
        <button
          onClick={handleInstall}
          className="w-full bg-white text-teal-600 py-5 px-8 rounded-2xl font-bold text-xl shadow-2xl flex items-center justify-center gap-3"
        >
          <ArrowDownTrayIcon className="w-7 h-7" />
          Install VocaRich
        </button>
      ) : (
        // iOS or no prompt: Open app
        <>
          <a
            href="/app"
            className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-2xl flex items-center justify-center gap-3"
          >
            <DevicePhoneMobileIcon className="w-7 h-7" />
            Open App
          </a>
          <button
            onClick={() => document.getElementById("install")?.scrollIntoView()}
            className="w-full bg-white text-teal-600 py-4 px-8 rounded-2xl font-bold text-lg shadow-xl"
          >
            How to Install
          </button>
        </>
      )}
    </div>
  );
};

export default InstallPrompt;
