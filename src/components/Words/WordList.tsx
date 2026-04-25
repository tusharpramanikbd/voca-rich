import type { Word } from "../../db/vocarichDb";
import BaseList from "../Common/BaseList";
import EmptyState from "../Common/EmptyState";
import NotFoundState from "../Common/NotFoundState";
import type { VisibilityMode } from "../Common/VisibilitySelector";
import WordItem from "./WordItem";

type TWordList = {
  words: Word[] | undefined;
  serachTerm?: string;
  visibilityMode?: VisibilityMode;
};

const WordList = ({ words, serachTerm, visibilityMode }: TWordList) => {
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
        <WordItem word={word} visibilityMode={visibilityMode} />
      )}
      bottomPadding={120}
    />
  );
};

export default WordList;
