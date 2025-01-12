import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const isDebug = process.argv.includes('--DEBUG');
const mode =  isDebug ? 'Debug' : 'Release';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildDir = path.join(__dirname, '..', 'build.em', mode);

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
  process.chdir(buildDir);
  execSync(`emcmake cmake ../.. -DCMAKE_BUILD_TYPE=${mode}`, { stdio: 'inherit' });
  execSync('rm -f ../Current', { stdio: 'inherit' });
  execSync(`ln -sv ${buildDir} ../Current`, { stdio: 'inherit' });
}
