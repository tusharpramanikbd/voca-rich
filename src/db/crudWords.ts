import { db, type Word } from "./vocarichDb.js";
import { v4 as uuidv4 } from "uuid";

export const createWord = async (
  moduleId: string,
  word: string,
  meaning: string,
  sentence?: string,
): Promise<Word> => {
  const now = Date.now();
  const w: Word = {
    id: uuidv4(),
    moduleId,
    word,
    meaning,
    sentence: sentence ?? "",
    createdAt: now,
    updatedAt: now,
  };
  await db.words.add(w);
  return w;
};

export const updateWord = async (
  id: string,
  updates: Partial<Word>,
): Promise<void> => {
  await db.words.update(id, { ...updates, updatedAt: Date.now() });
};

export const deleteWord = async (id: string): Promise<void> => {
  await db.words.delete(id);
};

export const listWordsByModule = async (moduleId: string): Promise<Word[]> => {
  return await db.words.where("moduleId").equals(moduleId).toArray();
};

export const countWordsByModule = async (moduleId: string): Promise<number> => {
  return await db.words.where("moduleId").equals(moduleId).count();
};
