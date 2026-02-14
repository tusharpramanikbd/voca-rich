import type { Word } from "../../db/vocarichDb";
import BaseList from "../Common/BaseList";
import EmptyState from "../Common/EmptyState";
import NotFoundState from "../Common/NotFoundState";
import WordItem from "./WordItem";

type TWordList = {
  words: Word[] | undefined;
  serachTerm?: string;
};

const WordList = ({ words, serachTerm }: TWordList) => {
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
      renderItem={(word) => <WordItem word={word} />}
    />
  );
};

export default WordList;
