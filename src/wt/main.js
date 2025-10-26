import { cpus } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';

const performCalculations = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const workerPath = join(__dirname, 'worker.js');
  const cpuCount = cpus().length;

  const promises = Array.from({ length: cpuCount }, (_, index) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath);
      let resolved = false;

      worker.on('message', (msg) => {
        if (!resolved) {
          resolved = true;
          resolve(msg);
          worker.terminate();
        }
      });

      worker.on('error', () => {
        if (!resolved) {
          resolved = true;
          resolve({ status: 'error', data: null });
          worker.terminate();
        }
      });

      worker.on('exit', (code) => {
        if (code !== 0 && !resolved) {
          resolved = true;
          resolve({ status: 'error', data: null });
        }
      });

      worker.postMessage(10 + index);
    });
  });

  const results = await Promise.all(promises);
  console.log(results);
};

await performCalculations();
