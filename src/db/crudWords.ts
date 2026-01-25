import { db, type Word } from "./vocarichDb.js";
import { v4 as uuidv4 } from "uuid";

export async function createWord(
  moduleId: string,
  word: string,
  meaning: string,
): Promise<Word> {
  const now = Date.now();
  const w: Word = {
    id: uuidv4(),
    moduleId,
    word,
    meaning,
    createdAt: now,
    updatedAt: now,
  };
  await db.words.add(w);
  return w;
}

export async function updateWord(
  id: string,
  updates: Partial<Word>,
): Promise<void> {
  await db.words.update(id, { ...updates, updatedAt: Date.now() });
}

export async function deleteWord(id: string): Promise<void> {
  await db.words.delete(id);
}

export async function listWordsByModule(moduleId: string): Promise<Word[]> {
  return await db.words.where("moduleId").equals(moduleId).toArray();
}

export async function countWordsByModule(moduleId: string): Promise<number> {
  return await db.words.where("moduleId").equals(moduleId).count();
}
