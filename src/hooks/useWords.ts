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
    [],
  ) as Word[];

  // Live word count
  const wordCount = useLiveQuery(async () => {
    if (!moduleId) return 0;
    return await countWordsByModule(moduleId);
  }, [moduleId]);

  async function handleSaveWord(word: string, meaning: string) {
    if (isAddSheetOpen) {
      if (!moduleId) return;
      await createWord(moduleId, word, meaning);
      return;
    }
    if (!editingWord?.id) return;
    await updateWord(editingWord.id, { word, meaning });
  }

  async function handleDeleteWord(id: string) {
    if (!confirm("Delete this word?")) return;
    await deleteWord(id);
  }

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
    handleDeleteWord,
  };
};

export default useWords;
