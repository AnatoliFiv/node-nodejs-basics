import { createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const write = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToWrite.txt');

  try {
    await pipeline(process.stdin, createWriteStream(filePath));
  } catch {
    throw new Error('FS operation failed');
  }
};

await write();
