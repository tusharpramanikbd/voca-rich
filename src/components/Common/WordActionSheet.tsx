import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

interface WordActionsProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const WordActionsSheet = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: WordActionsProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 40, stiffness: 300 }}
        className="fixed inset-0 z-50 flex flex-col"
      >
        <div
          className="flex-1 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl border-t border-gray-100 w-full"
          initial={{ scaleY: 0.95 }}
          animate={{ scaleY: 1 }}
        >
          <div className="pt-4 pb-2 px-6 flex justify-center">
            <div className="w-8 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <div className="px-6 pb-8">
            <button
              onClick={onEdit}
              className="w-full py-4 px-2 text-lg font-semibold text-gray-900 flex items-center gap-3"
            >
              <PencilIcon className="w-6 h-6" /> Edit
            </button>

            <button
              onClick={onDelete}
              className="w-full py-4 px-2 text-lg font-semibold text-red-600 flex items-center gap-3"
            >
              <TrashIcon className="w-6 h-6" /> Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
