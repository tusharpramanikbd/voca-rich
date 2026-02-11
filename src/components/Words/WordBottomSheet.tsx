import { useState, memo, useEffect } from "react";
import BaseBottomSheet from "../Common/BottomSheet/BaseBottomSheet";

type TWordBottomSheet = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (word: string, meaning: string) => Promise<void>;
  mode?: "add" | "edit";
  initialWord?: string;
  initialMeaning?: string;
};

const WordBottomSheet = ({
  isOpen,
  onClose,
  onSave,
  mode = "add",
  initialWord = "",
  initialMeaning = "",
}: TWordBottomSheet) => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const trimmedWord = word.trim();
    const trimmedMeaning = meaning.trim();
    if (!trimmedWord || !trimmedMeaning) return;

    setSaving(true);
    try {
      await onSave(trimmedWord, trimmedMeaning);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (isOpen && mode === "edit") {
      setWord(initialWord);
      setMeaning(initialMeaning);
    }

    return () => {
      setWord("");
      setMeaning("");
    };
  }, [isOpen, initialWord, initialMeaning, mode]);

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-6 pb-8 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 text-center">
          {mode === "add" ? "Add New Word" : "Edit Word"}
        </h3>

        <div className="space-y-3">
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Word..."
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-5 py-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <input
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            placeholder="Meaning..."
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-5 py-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={!word.trim() || !meaning.trim() || saving}
              className="flex-1 bg-linear-to-r from-teal-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving
                ? "Saving..."
                : mode === "add"
                  ? "Add Word"
                  : "Save Changes"}
            </button>
            <button
              onClick={onClose}
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

export default memo(WordBottomSheet);
