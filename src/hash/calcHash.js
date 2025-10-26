import { createHash } from "crypto";
import { createReadStream } from "fs";
import { dirname, join } from "path";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";

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
