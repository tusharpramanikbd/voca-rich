import { createContext, useContext, useMemo, useState } from "react";
import { useParams } from "react-router";
import type { Word } from "../db/vocarichDb";
import { createWord, deleteWord, updateWord } from "../db/crudWords";
import WordBottomSheet from "../components/Words/WordBottomSheet";
import ConfirmBottomSheet from "../components/Common/BottomSheet/ConfirmBottomSheet";

type ContextType = {
  openAddWord: () => void;
  openEditWord: (word: Word) => void;
  openDeleteWord: (id: string) => void;
};

const WordsModalContext = createContext<ContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useWordsModal = () => {
  const ctx = useContext(WordsModalContext);
  if (!ctx)
    throw new Error("useWordsModal must be used inside WordsModalProvider");
  return ctx;
};

export const WordsModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { module } = useParams();
  const moduleId = module ? module.split("+")[0] : null;

  const [addOpen, setAddOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ---------- actions ----------

  const openAddWord = () => setAddOpen(true);

  const openEditWord = (word: Word) => setEditingWord(word);

  const openDeleteWord = (id: string) => setDeleteId(id);

  // ---------- save ----------

  const handleAdd = async (word: string, meaning: string) => {
    if (!moduleId) return;
    await createWord(moduleId, word, meaning);
    setAddOpen(false);
  };

  const handleEdit = async (word: string, meaning: string) => {
    if (!editingWord) return;
    await updateWord(editingWord.id, { word, meaning });
    setEditingWord(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteWord(deleteId);
    setDeleteId(null);
  };

  const value = useMemo(
    () => ({
      openAddWord,
      openEditWord,
      openDeleteWord,
    }),
    [],
  );

  return (
    <WordsModalContext.Provider value={value}>
      {children}

      {/* ADD */}
      <WordBottomSheet
        key={addOpen ? "add-open" : "add-closed"}
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
      />

      {/* EDIT */}
      <WordBottomSheet
        key={editingWord?.id ?? "edit-closed"}
        isOpen={!!editingWord}
        onClose={() => setEditingWord(null)}
        onSave={handleEdit}
        mode="edit"
        initialWord={editingWord?.word}
        initialMeaning={editingWord?.meaning}
      />

      {/* DELETE */}
      <ConfirmBottomSheet
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete this word?"
        message="This will permanently remove the word from this module."
      />
    </WordsModalContext.Provider>
  );
};
