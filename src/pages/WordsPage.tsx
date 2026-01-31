import WordBottomSheet from "../components/Words/WordBottomSheet";
import Header from "../components/Common/Header";
import WordSearch from "../components/Words/WordSearch";
import WordList from "../components/Words/WordList";
import AddWordFAB from "../components/Words/AddWordFAB";
import useWords from "../hooks/useWords";
import ConfirmBottomSheet from "../components/Common/BottomSheet/ConfirmBottomSheet";

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
    <div className="h-dvh flex flex-col bg-linear-to-b from-teal-50 to-white">
      <div className="flex-0">
        <Header
          title={moduleName || "Module"}
          unit={wordCount > 1 ? "words" : "word"}
          itemCount={wordCount ?? 0}
          canGoBack={true}
        />
        <WordSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <WordList
        words={words}
        setEditingWord={setEditingWord}
        setIsEditSheetOpen={setIsEditSheetOpen}
        onAskDelete={requestDelete}
      />

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
