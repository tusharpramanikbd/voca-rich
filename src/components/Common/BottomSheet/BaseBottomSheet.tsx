import { AnimatePresence, motion } from "framer-motion";

type TBaseBottomSheet = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const BaseBottomSheet = ({ isOpen, onClose, children }: TBaseBottomSheet) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 40, stiffness: 300 }}
        className="fixed inset-0 z-50 flex flex-col h-full"
      >
        <div
          className="flex-1 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl border-t border-gray-100">
          <div className="pt-4 pb-2 px-6 flex justify-center">
            <div className="w-8 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {children}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default BaseBottomSheet;
