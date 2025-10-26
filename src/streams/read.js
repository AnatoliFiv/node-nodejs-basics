import { createReadStream } from "fs";
import { dirname, join } from "path";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";

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
