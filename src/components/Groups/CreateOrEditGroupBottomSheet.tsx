import { useState, memo, useEffect } from "react";
import BaseBottomSheet from "../Common/BottomSheet/BaseBottomSheet";

type TCreateOrEditGroupBottomSheet = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => Promise<void>;

  mode?: "add" | "edit";
  initialGroupName?: string;
};

const CreateOrEditGroupBottomSheet = ({
  isOpen,
  onClose,
  onCreate,
  mode = "add",
  initialGroupName = "",
}: TCreateOrEditGroupBottomSheet) => {
  const [groupName, setGroupName] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    const trimmed = groupName.trim();
    if (!trimmed) return;

    setSaving(true);
    try {
      await onCreate(trimmed);
      handleClose();
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setGroupName("");
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    setGroupName(initialGroupName ?? "");
  }, [initialGroupName, isOpen]);

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={handleClose}>
      <div className="px-6 pb-8 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 text-center">
          {mode === "add" ? "Create New Group" : "Edit Group"}
        </h3>

        <div className="space-y-3">
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group name..."
            autoFocus
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-5 py-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreate}
              disabled={!groupName.trim() || saving}
              className="flex-1 bg-linear-to-r from-teal-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving
                ? "Saving..."
                : mode === "add"
                  ? "Create Group"
                  : "Save Changes"}
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

export default memo(CreateOrEditGroupBottomSheet);
