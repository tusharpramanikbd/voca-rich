import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { useBreakpoint } from "../hooks/useBreakpoint";

const MobileOnlyGate = () => {
  const { isDesktop } = useBreakpoint();

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-teal-500/95 to-blue-600/95 backdrop-blur-md px-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-md w-full text-center border border-white/50">
        {/* Phone mockup */}
        <div className="bg-linear-to-b from-gray-900 to-gray-800 rounded-3xl p-6 pb-12 relative mx-auto w-48 h-96 mb-6 shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-blue-600 rounded-2xl opacity-10" />
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full" />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-teal-500 rounded-full shadow-lg">
            <DevicePhoneMobileIcon className="w-12 h-12 text-white absolute inset-0 m-auto" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          VocaRich is mobile-only
        </h2>

        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Optimized for iPhone & Android. Install as an app for the best
          experience.
        </p>

        <div className="space-y-4 text-sm bg-gray-50 p-4 rounded-2xl">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              📱 iPhone
            </h4>
            <p className="text-xs text-gray-700 ml-6">
              Safari → ⭕️ Share → "Add to Home Screen"
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              🤖 Android
            </h4>
            <p className="text-xs text-gray-700 ml-6">
              Chrome → ⋮ → "Install app" or "Add to Home Screen"
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
            Works best in portrait mode
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileOnlyGate;
