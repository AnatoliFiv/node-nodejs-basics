import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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
