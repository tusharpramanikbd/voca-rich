import { useMemo } from "react";

type PWAEnvironment = {
  isPWA: boolean;
  isIOSPWA: boolean;
  isAndroidPWA: boolean;
  isBrowser: boolean;
};

const usePWAEnvironment = (): PWAEnvironment => {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return {
        isPWA: false,
        isIOSPWA: false,
        isAndroidPWA: false,
        isBrowser: true,
      };
    }

    // ---- install detection ----
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    const minimalUI = window.matchMedia("(display-mode: minimal-ui)").matches;
    const iosStandalone = window.navigator.standalone === true;
    const twa = document.referrer.startsWith("android-app://");

    const isInstalled = standalone || minimalUI || iosStandalone || twa;

    // ---- OS detection (safe) ----
    const ua = navigator.userAgent.toLowerCase();

    const isIOS =
      /iphone|ipad|ipod/.test(ua) ||
      (ua.includes("mac") && "ontouchend" in document);

    const isAndroid = ua.includes("android");

    const isIOSPWA = isIOS && iosStandalone;
    const isAndroidPWA = isAndroid && isInstalled;

    return {
      isPWA: isInstalled,
      isIOSPWA,
      isAndroidPWA,
      isBrowser: !isInstalled,
    };
  }, []);
};

export default usePWAEnvironment;
