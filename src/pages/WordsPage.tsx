import WordsPageContent from "../components/Words/WordsPageContent";
import { WordsModalProvider } from "../providers/WordsModalProvider";

const WordsPage = () => {
  return (
    <WordsModalProvider>
      <WordsPageContent />
    </WordsModalProvider>
  );
};

export default WordsPage;
