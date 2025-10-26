import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const spawnChildProcess = async (args) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const childPath = join(__dirname, 'files', 'script.js');

  const childProcess = spawn('node', [childPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  process.stdin.pipe(childProcess.stdin);

  childProcess.stdout.pipe(process.stdout);

  childProcess.on('error', (error) => {
    console.error('Child process error:', error);
  });

  childProcess.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });

};

spawnChildProcess(['testArg', 'testArg1', 'testArg2']);
