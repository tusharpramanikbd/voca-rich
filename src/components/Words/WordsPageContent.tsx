import { useState } from "react";
import useWords from "../../hooks/useWords";
import Header from "../Common/Header";
import CreateGroupBottomSheet from "../Groups/CreateGroupBottomSheet";
import GroupList from "../Groups/GroupList";
import AddWordFAB from "./AddWordFAB";
import ChallengeFAB from "./ChallengeFAB";
import WordList from "./WordList";
import WordSearch from "./WordSearch";
import { useGroupsContext } from "../../providers/GroupsProvider";

const WordsPageContent = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const { groups, selectedGroupId, setSelectedGroupId, handleCreateGroup } =
    useGroupsContext();
  const { moduleName, moduleId, words, wordCount, searchTerm, setSearchTerm } =
    useWords(selectedGroupId);

  if (!moduleId) return <div>Invalid module</div>;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-linear-to-b from-teal-50 to-white">
      <Header
        title={moduleName || "Module"}
        unit={wordCount > 1 ? "words" : "word"}
        itemCount={wordCount ?? 0}
        canGoBack={true}
      />

      <GroupList
        groups={groups}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
        onAddGroup={() => setShowCreateGroup(true)}
      />

      <WordSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <WordList words={words} serachTerm={searchTerm} />

      <ChallengeFAB />
      <AddWordFAB />

      <CreateGroupBottomSheet
        isOpen={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
};

export default WordsPageContent;
