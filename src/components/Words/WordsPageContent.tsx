import useWords from "../../hooks/useWords";
import Header from "../Common/Header";
import AddWordFAB from "./AddWordFAB";
import WordList from "./WordList";
import WordSearch from "./WordSearch";

const WordsPageContent = () => {
  const { moduleName, moduleId, words, wordCount, searchTerm, setSearchTerm } =
    useWords();

  if (!moduleId) return <div>Invalid module</div>;

  return (
    <div className="h-dvh flex flex-col bg-linear-to-b from-teal-50 to-white">
      <Header
        title={moduleName || "Module"}
        unit={wordCount > 1 ? "words" : "word"}
        itemCount={wordCount ?? 0}
        canGoBack={true}
      />

      <WordSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <WordList words={words} serachTerm={searchTerm} />

      <AddWordFAB />
    </div>
  );
};

export default WordsPageContent;
