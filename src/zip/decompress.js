import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { createGunzip } from 'node:zlib';

const decompress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const inputPath = join(__dirname, 'files', 'archive.gz');
  const outputPath = join(__dirname, 'files', 'fileToCompress.txt');

  try {
    await access(inputPath);
    await pipeline(createReadStream(inputPath), createGunzip(), createWriteStream(outputPath));
  } catch {
    throw new Error("Operation failed");
  }
};

await decompress();
