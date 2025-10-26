import { Transform } from "stream";
import { pipeline } from "stream/promises";

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, _enc, callback) {
      const reversedInput = chunk.toString().split('').reverse().join('');
      callback(null, process.stdout.isTTY ? reversedInput + '\n' : reversedInput);
    },
  });

  try {
    await pipeline(process.stdin, reverseTransform, process.stdout);
  } catch {
    throw new Error('Operation failed');
  }
};

await transform();
