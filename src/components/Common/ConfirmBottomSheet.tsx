import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";

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
}: TConfirmBottomSheet) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 40, stiffness: 300 }}
          className="fixed inset-0 z-50 flex flex-col"
        >
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/30 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Sheet */}
          <div className="bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl border-t border-gray-100 max-h-[40vh]">
            <div className="pt-4 pb-6 px-6 flex justify-center">
              <div className="w-8 h-1.5 bg-gray-300 rounded-full" />
            </div>

            <div className="px-6 pb-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 text-center">
                {title}
              </h3>
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(ConfirmBottomSheet);
