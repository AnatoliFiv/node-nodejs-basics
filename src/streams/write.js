import { createWriteStream } from "fs";
import { dirname, join } from "path";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";

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
