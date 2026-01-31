import { useState } from "react";
import { useParams } from "react-router";
import type { Word } from "../db/vocarichDb";
import { useLiveQuery } from "dexie-react-hooks";
import {
  countWordsByModule,
  createWord,
  deleteWord,
  listWordsByModule,
  updateWord,
} from "../db/crudWords";

const useWords = () => {
  const { module } = useParams();
  const moduleId = module ? module.split("+")[0] : null;
  const moduleName = module ? module.split("+")[1] : null;

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);

  // Live words (filtered by search)
  const words = useLiveQuery(
    async () => {
      if (!moduleId) return [];
      const allWords = await listWordsByModule(moduleId);
      return allWords.filter(
        (w) =>
          w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.meaning.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    },
    [moduleId, searchTerm],
    undefined,
  ) as Word[] | undefined;

  // Live word count
  const wordCount =
    useLiveQuery(async () => {
      if (!moduleId) return 0;
      return await countWordsByModule(moduleId);
    }, [moduleId]) ?? 0;

  const handleSaveWord = async (word: string, meaning: string) => {
    if (isAddSheetOpen) {
      if (!moduleId) return;
      await createWord(moduleId, word, meaning);
      return;
    }
    if (!editingWord?.id) return;
    await updateWord(editingWord.id, { word, meaning });
  };

  const requestDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteSheetOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteWord(deleteId); // your existing delete function
    setIsDeleteSheetOpen(false);
    setDeleteId(null);
  };

  return {
    moduleId,
    moduleName,
    words,
    wordCount,
    searchTerm,
    isAddSheetOpen,
    isEditSheetOpen,
    editingWord,
    setSearchTerm,
    setIsAddSheetOpen,
    setIsEditSheetOpen,
    setEditingWord,
    handleSaveWord,
    requestDelete,
    confirmDelete,
    isDeleteSheetOpen,
    setIsDeleteSheetOpen,
    setDeleteId,
  };
};

export default useWords;
