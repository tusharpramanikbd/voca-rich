import useWords from "../../hooks/useWords";
import Header from "../Common/Header";
import GroupList from "../Groups/GroupList";
import AddWordFAB from "./AddWordFAB";
import ChallengeFAB from "./ChallengeFAB";
import WordList from "./WordList";
import WordSearch from "./WordSearch";
import { useGroupsContext } from "../../providers/GroupsProvider";
import { useState } from "react";
import type { VisibilityMode } from "../Common/VisibilitySelector";

const WordsPageContent = () => {
  const [visibilityMode, setVisibilityMode] = useState<VisibilityMode>("BOTH");

  const { groups, selectedGroupId, setSelectedGroupId, openCreateGroup } =
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
        showVisibilitySelector={true}
        visibilityMode={visibilityMode}
        onChangeVisibilityMode={setVisibilityMode}
      />

      <GroupList
        groups={groups}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
        onAddGroup={openCreateGroup}
      />

      <WordSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <WordList
        words={words}
        serachTerm={searchTerm}
        visibilityMode={visibilityMode}
      />

      <ChallengeFAB />
      <AddWordFAB />
    </div>
  );
};

export default WordsPageContent;
