import WordBottomSheet from "../components/Words/WordBottomSheet";
import Header from "../components/Common/Header";
import WordSearch from "../components/Words/WordSearch";
import WordList from "../components/Words/WordList";
import AddWordFAB from "../components/Words/AddWordFAB";
import useWords from "../hooks/useWords";

export default function WordsPage() {
  const {
    moduleName,
    moduleId,
    words,
    wordCount,
    searchTerm,
    setSearchTerm,
    isAddSheetOpen,
    setIsAddSheetOpen,
    isEditSheetOpen,
    setIsEditSheetOpen,
    editingWord,
    setEditingWord,
    handleSaveWord,
    handleDeleteWord,
  } = useWords();

  if (!moduleId) return <div>Invalid module</div>;

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-white">
      {/* Header */}
      <Header
        title={moduleName || "Module"}
        unit="words"
        itemCount={wordCount ?? 0}
        canGoBack={true}
      />

      {/* Search */}
      <WordSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Words List */}
      <WordList
        words={words}
        setEditingWord={setEditingWord}
        setIsEditSheetOpen={setIsEditSheetOpen}
        handleDeleteWord={handleDeleteWord}
      />

      {/* FAB */}
      <AddWordFAB setIsAddSheetOpen={setIsAddSheetOpen} />

      {/* Add/Edit Bottom Sheet */}
      <WordBottomSheet
        isOpen={isAddSheetOpen || isEditSheetOpen}
        onClose={() => {
          setIsAddSheetOpen(false);
          setIsEditSheetOpen(false);
        }}
        onSave={handleSaveWord}
        mode={isAddSheetOpen ? "add" : "edit"}
        initialWord={editingWord?.word}
        initialMeaning={editingWord?.meaning}
      />
    </div>
  );
}
