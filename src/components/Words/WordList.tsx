import type { Word } from "../../db/vocarichDb";
import BaseList from "../Common/BaseList";
import EmptyState from "../Common/EmptyState";
import WordItem from "./WordItem";

type TWordList = {
  words: Word[];
  setEditingWord: React.Dispatch<React.SetStateAction<Word | null>>;
  setIsEditSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAskDelete: (id: string) => void;
};

const WordList = ({
  words,
  setEditingWord,
  setIsEditSheetOpen,
  onAskDelete,
}: TWordList) => {
  return (
    <BaseList
      items={words}
      renderEmpty={<EmptyState emptyType="word" />}
      renderItem={(word) => (
        <WordItem
          key={word.id}
          word={word}
          setEditingWord={setEditingWord}
          setIsEditSheetOpen={setIsEditSheetOpen}
          onAskDelete={onAskDelete}
        />
      )}
    />
  );
};

export default WordList;
