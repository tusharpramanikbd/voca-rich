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
  sentence?: string;
  audioBlob?: Blob | null;
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

db.version(2)
  .stores({
    modules: "id, name, createdAt, updatedAt",
    words: "id, moduleId, word, createdAt, updatedAt, [moduleId+word]",
  })
  .upgrade(async (tx) => {
    await tx
      .table("words")
      .toCollection()
      .modify((word: Word) => {
        if (word.sentence === undefined) {
          word.sentence = "";
        }
      });
  });

db.version(3).stores({
  modules: "id, name, createdAt, updatedAt",
  words: "id, moduleId, word, createdAt, updatedAt, [moduleId+word]",
});

db.version(4).stores({
  modules: "id, name, createdAt, updatedAt",
  words:
    "id, moduleId, word, createdAt, updatedAt, [moduleId+word], [moduleId+createdAt]",
});

export type { Module, Word };
export { db };
