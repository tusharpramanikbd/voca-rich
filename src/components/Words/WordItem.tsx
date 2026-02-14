import type { Word } from "../../db/vocarichDb";
import { memo } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useWordsModal } from "../../providers/WordsModalProvider";

type TWordItem = {
  word: Word;
};

const WordItem = ({ word }: TWordItem) => {
  const { openActions, openDetails } = useWordsModal();

  return (
    <div
      onClick={() => openDetails(word)}
      className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 flex items-center justify-between"
    >
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{word?.word}</h3>
        <p className="text-lg text-gray-700 leading-relaxed">{word?.meaning}</p>
      </div>

      {/* Single 3-dots button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openActions(word);
        }}
        className="p-4"
      >
        <EllipsisVerticalIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default memo(WordItem);
