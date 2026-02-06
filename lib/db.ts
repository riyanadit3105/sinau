import fs from "fs/promises";
import path from "path";

const dataDirectory = path.join(process.cwd(), "data");

const ensureDataDir = async () => {
  try {
    await fs.access(dataDirectory);
  } catch {
    await fs.mkdir(dataDirectory, { recursive: true });
  }
};

// --- FUNGSI INTERNAL (CORE) ---
const readJson = async <T>(fileName: string): Promise<T> => {
  await ensureDataDir();
  const filePath = path.join(dataDirectory, fileName);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents) as T;
  } catch (error) {
    if (fileName.includes("stats")) return {} as unknown as T;
    return [] as unknown as T;
  }
};

const writeJson = async <T>(fileName: string, data: T): Promise<void> => {
  await ensureDataDir();
  const filePath = path.join(dataDirectory, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
};

// ==========================================
// 1. EKSPOR CARA BARU (Untuk Fitur XP/Gamifikasi)
// ==========================================
export const db = {
  read: readJson,
  write: writeJson,
};

// ==========================================
// 2. EKSPOR CARA LAMA (Untuk Login/Register/Users Lama)
// ==========================================
export async function getUsers() {
  // Panggil fungsi internal readJson
  return await readJson<any[]>("users.json");
}

export async function saveUser(newUser: any) {
  const users = await getUsers();
  
  // Validasi duplikat email sederhana
  if (users.find((u: any) => u.email === newUser.email)) {
    throw new Error("Email sudah terdaftar!");
  }

  users.push(newUser);
  await writeJson("users.json", users);
  return newUser;
}