import { cp } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const copy = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const sourceDirPath = join(__dirname, 'files');
  const targetDirPath = join(__dirname, 'files_copy');

  try {
    await cp(sourceDirPath, targetDirPath, { recursive: true, force: false, errorOnExist: true });
  } catch {
    throw new Error('FS operation failed');
  }
};

await copy();
