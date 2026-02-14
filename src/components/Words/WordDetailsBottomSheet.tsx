import { memo } from "react";
import BaseBottomSheet from "../Common/BottomSheet/BaseBottomSheet";
import type { Word } from "../../db/vocarichDb";

type Props = {
  word: Word | null;
  isOpen: boolean;
  onClose: () => void;
};

const WordDetailsBottomSheet = ({ word, isOpen, onClose }: Props) => {
  return (
    <BaseBottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-6 pb-10 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          {word?.word}
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Meaning</p>
            <p className="text-xl text-gray-800">{word?.meaning}</p>
          </div>

          {word?.sentence && word?.sentence?.trim() !== "" && (
            <div>
              <p className="text-sm text-gray-500">Example</p>
              <p className="text-lg text-gray-700 italic leading-relaxed">
                {word?.sentence}
              </p>
            </div>
          )}
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default memo(WordDetailsBottomSheet);
