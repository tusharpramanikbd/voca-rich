import type { Word } from "../../db/vocarichDb";
import BaseList from "../Common/BaseList";
import EmptyState from "../Common/EmptyState";
import NotFoundState from "../Common/NotFoundState";
import WordItem from "./WordItem";

type TWordList = {
  words: Word[] | undefined;
  setEditingWord: React.Dispatch<React.SetStateAction<Word | null>>;
  setIsEditSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAskDelete: (id: string) => void;
  serachTerm?: string;
};

const WordList = ({
  words,
  setEditingWord,
  setIsEditSheetOpen,
  onAskDelete,
  serachTerm,
}: TWordList) => {
  const emptyNode =
    serachTerm && serachTerm.trim() !== "" && words && words.length === 0 ? (
      <NotFoundState />
    ) : (
      <EmptyState emptyType="word" />
    );

  return (
    <BaseList
      items={words}
      renderEmpty={emptyNode}
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
