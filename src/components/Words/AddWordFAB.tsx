import { motion } from "framer-motion";

type TAddWordFAB = {
  setIsAddSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddWordFAB = ({ setIsAddSheetOpen }: TAddWordFAB) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAddSheetOpen(true)}
        className="w-16 h-16 bg-linear-to-r from-teal-500 to-blue-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl flex items-center justify-center text-2xl"
      >
        +
      </motion.button>
    </div>
  );
};

export default AddWordFAB;
