// storage.js
import { promises as fs } from "fs";
import path from "path";

const STORAGE_PATH = path.resolve(process.cwd(), "storage.json");

const DEFAULT_DATA = {
  busy: [], // { id, userKey, date, start, end, reason, createdAt }
  proposals: [], // { id, channelId, messageId, date, start, end, durationMin, creatorId, responses, createdAt, status }
};

export async function loadStore() {
  try {
    const raw = await fs.readFile(STORAGE_PATH, "utf-8");
    const data = JSON.parse(raw);
    // 최소 스키마 보정
    return {
      busy: Array.isArray(data.busy) ? data.busy : [],
      proposals: Array.isArray(data.proposals) ? data.proposals : [],
    };
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

export async function saveStore(data) {
  await fs.writeFile(STORAGE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function withStore(mutator) {
  const store = await loadStore();
  const result = await mutator(store);
  await saveStore(store);
  return result;
}
