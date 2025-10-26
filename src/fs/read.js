import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  try {
    const fileContent = await readFile(filePath, 'utf8');
    console.log(fileContent);
  } catch {
    throw new Error('FS operation failed');
  }
};

await read();
