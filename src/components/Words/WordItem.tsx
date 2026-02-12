import type { Word } from "../../db/vocarichDb";
import { memo, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import ActionsBottomSheet from "../Common/BottomSheet/ActionsBottomSheet";
import { useWordsModal } from "../../providers/WordsModalProvider";

type TWordItem = {
  word: Word;
};

const WordItem = ({ word }: TWordItem) => {
  const { openEditWord, openDeleteWord } = useWordsModal();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {word?.word}
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            {word?.meaning}
          </p>
        </div>

        {/* Single 3-dots button */}
        <button onClick={() => setShowMenu(true)}>
          <EllipsisVerticalIcon className="w-6 h-6" />
        </button>
      </div>

      <ActionsBottomSheet
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onEdit={() => {
          openEditWord(word);
          setShowMenu(false);
        }}
        onDelete={() => {
          openDeleteWord(word.id);
          setShowMenu(false);
        }}
      />
    </>
  );
};

export default memo(WordItem);
