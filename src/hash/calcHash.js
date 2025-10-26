import { createHash } from "node:crypto";
import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const calculateHash = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');

  try {
    await pipeline(createReadStream(filePath), hash);
    console.log(hash.digest('hex'));
  } catch {
    throw new Error('Hash operation failed');
  }
};

await calculateHash();
