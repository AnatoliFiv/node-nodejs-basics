import { unlink } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const remove = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await unlink(filePath);
  } catch {
    throw new Error('FS operation failed');
  }
};

await remove();
