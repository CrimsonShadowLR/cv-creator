import type { Resume } from "@/types/resume";

/** Migrate records that were saved before the phone split. */
function migrateResume(raw: Record<string, unknown>): Resume {
  if ("phone" in raw && !("phoneCode" in raw)) {
    const phone = (raw.phone as string) ?? "";
    const match = phone.match(/^(\+\d{1,4})\s*(.*)$/);
    const { phone: _removed, ...rest } = raw;
    void _removed;
    return {
      ...rest,
      phoneCode: match ? match[1] : "+1",
      phoneNumber: match ? match[2] : phone,
    } as unknown as Resume;
  }
  return raw as unknown as Resume;
}

const DB_NAME = "cv-helper-db";
const DB_VERSION = 1;
const STORE_NAME = "resumes";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllResumes(): Promise<Resume[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).getAll();
    request.onsuccess = () =>
      resolve((request.result as Record<string, unknown>[]).map(migrateResume));
    request.onerror = () => reject(request.error);
  });
}

export async function getResume(id: string): Promise<Resume | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => {
      const raw = request.result as Record<string, unknown> | undefined;
      resolve(raw ? migrateResume(raw) : undefined);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function saveResume(resume: Resume): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(resume);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function deleteResume(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Seeds the DB with initial data only when the store is empty. */
export async function seedIfEmpty(initialData: Resume[]): Promise<void> {
  const existing = await getAllResumes();
  if (existing.length > 0) return;
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    for (const resume of initialData) {
      store.put(resume);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
