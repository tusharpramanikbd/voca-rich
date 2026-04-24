import type { Word } from "../../db/vocarichDb";
import BaseList from "../Common/BaseList";
import EmptyState from "../Common/EmptyState";
import NotFoundState from "../Common/NotFoundState";
import WordItem from "./WordItem";

type TWordList = {
  words: Word[] | undefined;
  serachTerm?: string;
  isShowMeanings?: boolean;
};

const WordList = ({ words, serachTerm, isShowMeanings }: TWordList) => {
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
        <WordItem word={word} isShowMeanings={isShowMeanings} />
      )}
      bottomPadding={120}
    />
  );
};

export default WordList;
