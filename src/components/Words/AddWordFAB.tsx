import { useWordsModal } from "../../providers/WordsModalProvider";

const AddWordFAB = () => {
  const { openAddWord } = useWordsModal();
  return (
    <div className="fixed bottom-6 right-4 z-40">
      <button
        onClick={openAddWord}
        className="w-16 h-16 bg-linear-to-r from-teal-500 to-blue-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl flex items-center justify-center text-2xl"
      >
        +
      </button>
    </div>
  );
};

export default AddWordFAB;
