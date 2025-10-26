import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const list = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const dirPath = join(__dirname, 'files');

  try {
    const files = await readdir(dirPath);
    console.log(files);
  } catch {
    throw new Error('FS operation failed');
  }
};

await list();
