import WordBottomSheet from "../components/Words/WordBottomSheet";
import Header from "../components/Common/Header";
import WordSearch from "../components/Words/WordSearch";
import WordList from "../components/Words/WordList";
import AddWordFAB from "../components/Words/AddWordFAB";
import useWords from "../hooks/useWords";
import ConfirmBottomSheet from "../components/Common/ConfirmBottomSheet";

const WordsPage = () => {
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
    requestDelete,
    confirmDelete,
    isDeleteSheetOpen,
    setIsDeleteSheetOpen,
    setDeleteId,
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
        onAskDelete={requestDelete}
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

      {/* Delete Confirmation Bottom Sheet */}
      <ConfirmBottomSheet
        isOpen={isDeleteSheetOpen}
        onCancel={() => {
          setIsDeleteSheetOpen(false);
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
        title="Delete this word?"
        message="This will permanently remove the word from this module."
        confirmLabel="Delete"
      />
    </div>
  );
};

export default WordsPage;
