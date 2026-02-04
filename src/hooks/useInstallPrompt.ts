import { useEffect, useState } from "react";

const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handlePrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handlePrompt as EventListener,
    );
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handlePrompt as EventListener,
      );
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Native PWA install (Android)
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      // iOS Safari → guide to manual install
      document
        .getElementById("install")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { deferredPrompt, handleInstall };
};

export default useInstallPrompt;
