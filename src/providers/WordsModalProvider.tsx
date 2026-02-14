import { createContext, useContext, useMemo, useState } from "react";
import { useParams } from "react-router";
import type { Word } from "../db/vocarichDb";
import { createWord, deleteWord, updateWord } from "../db/crudWords";
import WordBottomSheet from "../components/Words/WordBottomSheet";
import ConfirmBottomSheet from "../components/Common/BottomSheet/ConfirmBottomSheet";
import ActionsBottomSheet from "../components/Common/BottomSheet/ActionsBottomSheet";
import WordDetailsBottomSheet from "../components/Words/WordDetailsBottomSheet";

type ContextType = {
  openAddWord: () => void;
  openEditWord: (word: Word) => void;
  openDeleteWord: (id: string) => void;
  openActions: (word: Word) => void;
  openDetails: (word: Word) => void;
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
  const [actionWord, setActionWord] = useState<Word | null>(null);
  const [detailsWord, setDetailsWord] = useState<Word | null>(null);

  // ---------- actions ----------

  const openAddWord = () => setAddOpen(true);

  const openEditWord = (word: Word) => setEditingWord(word);

  const openDeleteWord = (id: string) => setDeleteId(id);

  const openActions = (word: Word) => setActionWord(word);

  const openDetails = (word: Word) => setDetailsWord(word);

  // ---------- save ----------

  const handleAdd = async (word: string, meaning: string, sentence: string) => {
    if (!moduleId) return;
    await createWord(moduleId, word, meaning, sentence);
    setAddOpen(false);
  };

  const handleEdit = async (
    word: string,
    meaning: string,
    sentence: string,
  ) => {
    if (!editingWord) return;
    await updateWord(editingWord.id, { word, meaning, sentence });
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
      openActions,
      openDetails,
    }),
    [],
  );

  return (
    <WordsModalContext.Provider value={value}>
      {children}

      {/* ADD */}
      <WordBottomSheet
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
      />

      {/* EDIT */}
      <WordBottomSheet
        isOpen={!!editingWord}
        onClose={() => setEditingWord(null)}
        onSave={handleEdit}
        mode="edit"
        initialWord={editingWord?.word}
        initialMeaning={editingWord?.meaning}
        initialSentence={editingWord?.sentence}
      />

      {/* DELETE */}
      <ConfirmBottomSheet
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete this word?"
        message="This will permanently remove the word from this module."
      />

      {/* ACTIONS */}
      <ActionsBottomSheet
        isOpen={!!actionWord}
        onClose={() => setActionWord(null)}
        onEdit={() => {
          if (!actionWord) return;
          openEditWord(actionWord);
          setActionWord(null);
        }}
        onDelete={() => {
          if (!actionWord) return;
          openDeleteWord(actionWord.id);
          setActionWord(null);
        }}
      />

      {/* DETAILS */}
      <WordDetailsBottomSheet
        isOpen={!!detailsWord}
        word={detailsWord}
        onClose={() => setDetailsWord(null)}
      />
    </WordsModalContext.Provider>
  );
};
