const InstallInstruction = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-8 bg-linear-to-r from-white to-teal-100 bg-clip-text text-transparent">
        Install Guide
      </h3>

      <div className="space-y-6">
        {/* iPhone */}
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
          <h4 className="font-bold text-xl mb-4 flex items-center gap-3">
            📱 iPhone (Safari)
          </h4>
          <div className="space-y-2 text-lg">
            <div>
              1. Tap ⭕️ <strong>Share</strong>
            </div>
            <div>
              2. Scroll → <strong>"Add to Home Screen"</strong>
            </div>
            <div>
              3. Tap <strong>Add</strong>
            </div>
          </div>
        </div>

        {/* Android */}
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
          <h4 className="font-bold text-xl mb-4 flex items-center gap-3">
            🤖 Android (Chrome)
          </h4>
          <div className="space-y-2 text-lg">
            <div>
              1. Tap ⋮ <strong>Menu</strong>
            </div>
            <div>
              2. <strong>"Install app"</strong> or{" "}
              <strong>"Add to Home Screen"</strong>
            </div>
            <div>
              3. Tap <strong>Install</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallInstruction;
