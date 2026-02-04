const useIsPWA = () => {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  const isMinimalUI = window.matchMedia("(display-mode: minimal-ui)").matches;
  const isIOSPWA = window.navigator.standalone === true;
  const isTWA = document.referrer.startsWith("android-app://");

  return isStandalone || isMinimalUI || isIOSPWA || isTWA;
};

export default useIsPWA;
