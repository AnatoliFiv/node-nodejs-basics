import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';

const compress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const inputPath = join(__dirname, 'files', 'fileToCompress.txt');
  const outputPath = join(__dirname, 'files', 'archive.gz');

  try {
    await access(inputPath);
    await pipeline(createReadStream(inputPath), createGzip(), createWriteStream(outputPath));
  } catch {
    throw new Error("Operation failed");
  }
};

await compress();
