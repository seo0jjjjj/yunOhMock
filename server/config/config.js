import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

class Config{
  constructor() {
    
  }

  initConfig() {
    
  }

  checkConfig() {
    dotenv.config({ path: 'keys.env' });
    console.log(process.env);
  }
}


// new Config().checkConfig();


// print of this dirname;
console.log(import.meta.url);

export function print() {
  const currentDirname = fileURLToPath(import.meta.url);
  // ...server\config\config.js -> ...server
  const projectRootDir = path.resolve(currentDirname, '../', 'keys.env');
  
  console.log(projectRootDir)
  const reuslt = fs.existsSync(projectRootDir);

  console.log(reuslt);
}
