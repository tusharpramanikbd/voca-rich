import type { Word } from "../../db/vocarichDb";
import EmptyState from "../Common/EmptyState";
import WordItem from "./WordItem";

type TWordList = {
  words: Word[];
  setEditingWord: React.Dispatch<React.SetStateAction<Word | null>>;
  setIsEditSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteWord: (id: string) => Promise<void>;
};

const WordList = ({
  words,
  setEditingWord,
  setIsEditSheetOpen,
  handleDeleteWord,
}: TWordList) => {
  return (
    <div className="px-6 space-y-4 pb-24">
      {(words ?? []).map((word) => (
        <WordItem
          key={word.id}
          word={word}
          setEditingWord={setEditingWord}
          setIsEditSheetOpen={setIsEditSheetOpen}
          handleDeleteWord={handleDeleteWord}
        />
      ))}

      {words && words.length === 0 && <EmptyState emptyType="word" />}
    </div>
  );
};

export default WordList;
