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
  groupId?: string | null;
  createdAt: number;
  updatedAt: number;
};

type Group = {
  id: string;
  moduleId: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};

const db = new Dexie("VocaRich") as Dexie & {
  modules: EntityTable<Module, "id">;
  words: EntityTable<Word, "id">;
  groups: EntityTable<Group, "id">;
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

db.version(5)
  .stores({
    modules: "id, name, createdAt, updatedAt",
    words:
      "id, moduleId, word, createdAt, updatedAt, groupId, [moduleId+word], [moduleId+createdAt]",
    groups: "id, moduleId, name, createdAt, updatedAt",
  })
  .upgrade(async (tx) => {
    // add groupId to existing words
    await tx
      .table("words")
      .toCollection()
      .modify((word: Word) => {
        if (word.groupId === undefined) {
          word.groupId = null;
        }
      });
  });

export type { Module, Word, Group };
export { db };
