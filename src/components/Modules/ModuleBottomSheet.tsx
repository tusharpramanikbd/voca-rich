import { useState, memo, useEffect } from "react";
import BaseBottomSheet from "../Common/BottomSheet/BaseBottomSheet";

type TModuleBottomSheet = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => Promise<void>;
  initialWord?: string;
};

const ModuleBottomSheet = ({
  isOpen,
  onClose,
  onSave,
  initialWord = "",
}: TModuleBottomSheet) => {
  const [moduleTitle, setModuleTitle] = useState(initialWord);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const trimmedModuleTitle = moduleTitle.trim();
    if (!trimmedModuleTitle) return;

    setSaving(true);
    try {
      await onSave(trimmedModuleTitle);
      handleClose();
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setModuleTitle(initialWord);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    setModuleTitle(initialWord ?? "");
  }, [isOpen, initialWord]);

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={handleClose}>
      <div className="px-6 pb-8 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 text-center">
          Edit Module
        </h3>

        <div className="space-y-3">
          <input
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            placeholder="Module Title..."
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-5 py-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={!moduleTitle.trim() || saving}
              className="flex-1 bg-linear-to-r from-teal-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleClose}
              disabled={saving}
              className="px-8 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default memo(ModuleBottomSheet);
