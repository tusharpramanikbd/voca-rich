import type { Word } from "../../db/vocarichDb";
import { memo, useState } from "react";
import { WordActionsSheet } from "../Common/WordActionSheet";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

type TWordItem = {
  word: Word;
  setEditingWord: React.Dispatch<React.SetStateAction<Word | null>>;
  setIsEditSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAskDelete: (id: string) => void;
};

const WordItem = ({
  word,
  setEditingWord,
  setIsEditSheetOpen,
  onAskDelete,
}: TWordItem) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 flex items-start justify-between">
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

      <WordActionsSheet
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onEdit={() => {
          setEditingWord(word);
          setIsEditSheetOpen(true);
          setShowMenu(false);
        }}
        onDelete={() => {
          onAskDelete(word.id);
          setShowMenu(false);
        }}
      />
    </>
  );
};

export default memo(WordItem);
