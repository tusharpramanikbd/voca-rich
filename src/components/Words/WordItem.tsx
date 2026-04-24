import type { Word } from "../../db/vocarichDb";
import { memo } from "react";
import {
  EllipsisVerticalIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useWordsModal } from "../../providers/WordsModalProvider";
import { useGroupsContext } from "../../providers/GroupsProvider";
import { ALL_GROUP_ID } from "../../hooks/useGroups";

type TWordItem = {
  word: Word;
  isShowMeanings?: boolean;
};

const WordItem = ({ word, isShowMeanings }: TWordItem) => {
  const { openActions, openDetails } = useWordsModal();
  const { selectedGroupId } = useGroupsContext();

  const isAllGroup = selectedGroupId === ALL_GROUP_ID;
  const isWordGrouped = !!word.groupId;

  return (
    <div
      onClick={() => openDetails(word)}
      className="bg-white/70 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/50 flex items-center justify-between"
    >
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {word?.word}
          </h3>
          {isAllGroup && isWordGrouped && (
            <CheckCircleIcon className="w-4 h-4 text-teal-500" />
          )}
        </div>
        {isShowMeanings && (
          <p className="text-lg text-gray-700 leading-relaxed">
            {word?.meaning}
          </p>
        )}
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
