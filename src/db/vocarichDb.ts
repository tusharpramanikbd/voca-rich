import { Dexie, type EntityTable } from "dexie";

type Module = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};

type Word = {
  id: string;
  moduleId: string;
  word: string;
  meaning: string;
  createdAt: number;
  updatedAt: number;
};

const db = new Dexie("VocaRich") as Dexie & {
  modules: EntityTable<Module, "id">;
  words: EntityTable<Word, "id">;
};

// Schema declaration:
db.version(1).stores({
  modules: "id, name, createdAt, updatedAt",
  words: "id, moduleId, word, createdAt, updatedAt, [moduleId+word]",
});

export type { Module, Word };
export { db };
