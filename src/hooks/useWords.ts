import { useState } from "react";
import { useParams } from "react-router";
import type { Word } from "../db/vocarichDb";
import { useLiveQuery } from "dexie-react-hooks";
import { countWordsByModule, listWordsByModule } from "../db/crudWords";

const useWords = () => {
  const { module } = useParams();
  const moduleId = module ? module.split("+")[0] : null;
  const moduleName = module ? module.split("+")[1] : null;

  const [searchTerm, setSearchTerm] = useState("");

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

  return {
    module,
    moduleId,
    moduleName,
    words,
    wordCount,
    searchTerm,
    setSearchTerm,
  };
};

export default useWords;
