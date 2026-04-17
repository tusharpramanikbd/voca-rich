import WordsPageContent from "../components/Words/WordsPageContent";
import { GroupsProvider } from "../providers/GroupsProvider";
import { WordsModalProvider } from "../providers/WordsModalProvider";

const WordsPage = () => {
  return (
    <GroupsProvider>
      <WordsModalProvider>
        <WordsPageContent />
      </WordsModalProvider>
    </GroupsProvider>
  );
};

export default WordsPage;
