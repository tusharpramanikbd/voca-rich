import { useState } from "react";
import { useParams } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import {
  createWord,
  updateWord,
  deleteWord,
  listWordsByModule,
  countWordsByModule,
} from "../db/crudWords";
import type { Word } from "../db/vocarichDb";
import WordBottomSheet from "../components/Words/WordBottomSheet";
import Header from "../components/Common/Header";
import WordSearch from "../components/Words/WordSearch";
import WordList from "../components/Words/WordList";
import AddWordFAB from "../components/Words/AddWordFAB";

export default function WordsPage() {
  const { moduleId } = useParams();
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

  async function handleDeleteWord(id: string) {
    if (!confirm("Delete this word?")) return;
    await deleteWord(id);
  }

  if (!moduleId) return <div>Invalid module</div>;

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-white">
      {/* Header */}
      <Header
        title="Words"
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

      {/* Add Sheet */}
      <WordBottomSheet
        isOpen={isAddSheetOpen}
        onClose={() => setIsAddSheetOpen(false)}
        onSave={async (word, meaning) => {
          if (!moduleId) return;
          await createWord(moduleId, word, meaning);
        }}
        mode="add"
      />

      {/* Edit Sheet */}
      <WordBottomSheet
        isOpen={isEditSheetOpen}
        onClose={() => setIsEditSheetOpen(false)}
        onSave={async (word, meaning) => {
          if (!editingWord?.id) return;
          await updateWord(editingWord.id, { word, meaning });
        }}
        mode="edit"
        initialWord={editingWord?.word}
        initialMeaning={editingWord?.meaning}
      />
    </div>
  );
}
