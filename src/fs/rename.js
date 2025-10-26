import { access, rename as fsRename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
  const newPath = join(__dirname, 'files', 'properFilename.md');
  const createFsError = () => new Error('FS operation failed');
  let newPathExists = true;

  try {
    await access(newPath);
  } catch (err) {
    if (err.code === 'ENOENT') newPathExists = false;
    else throw createFsError();
  }

  if (newPathExists) throw createFsError();

  try {
    await access(oldPath);
    await fsRename(oldPath, newPath);
  } catch {
    throw createFsError();
  }
};

await rename();
