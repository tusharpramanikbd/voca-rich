import { memo } from "react";
import BaseBottomSheet from "./BaseBottomSheet";

type TConfirmBottomSheet = {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

const ConfirmBottomSheet = ({
  isOpen,
  title = "Delete word?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: TConfirmBottomSheet) => (
  <BaseBottomSheet isOpen={isOpen} onClose={onCancel}>
    <div className="px-6 pb-8 space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 text-center">{title}</h3>
      <p className="text-base text-gray-600 text-center">{message}</p>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-red-600 transition-colors"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </BaseBottomSheet>
);

export default memo(ConfirmBottomSheet);
