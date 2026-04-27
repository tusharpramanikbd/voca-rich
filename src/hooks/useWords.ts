import { useMemo, useState } from "react";
import { useParams } from "react-router";
import type { Word } from "../db/vocarichDb";
import { useLiveQuery } from "dexie-react-hooks";
import { countWordsByModule, listWordsByModule } from "../db/crudWords";
import { shuffle } from "../utils/challengeQuestionFactory";

const useWords = (selectedGroupId?: string) => {
  const { module } = useParams();
  const moduleId = module ? module.split("+")[0] : null;
  const moduleName = module ? module.split("+")[1] : null;

  const [isShuffled, setIsShuffled] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const words = useLiveQuery(
    async () => {
      if (!moduleId) return [];

      const allWords = await listWordsByModule(moduleId);

      return allWords.filter((w) => {
        const matchesSearch =
          w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.meaning.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGroup =
          !selectedGroupId ||
          selectedGroupId === "ALL" ||
          w.groupId === selectedGroupId;

        return matchesSearch && matchesGroup;
      });
    },
    [moduleId, searchTerm, selectedGroupId],
    undefined,
  ) as Word[] | undefined;

  const shuffledWords = useMemo(() => {
    if (!isShuffled) return words;

    return shuffle(words || []);
  }, [words, isShuffled]);

  const wordCount =
    useLiveQuery(async () => {
      if (!moduleId) return 0;
      return await countWordsByModule(moduleId);
    }, [moduleId]) ?? 0;

  return {
    module,
    moduleId,
    moduleName,
    words: shuffledWords,
    wordCount,
    searchTerm,
    setSearchTerm,
    isShuffled,
    setIsShuffled,
  };
};

export default useWords;
