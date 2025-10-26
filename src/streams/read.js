import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  try {
    await pipeline(createReadStream(filePath), process.stdout, { end: false })
    if (process.stdout.isTTY) {
      process.stdout.write('\n');
    }
  } catch {
    throw new Error('FS operation failed');
  }
};

await read();
