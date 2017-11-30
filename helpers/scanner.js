import { execSync } from 'child_process';
import { fb } from '../app';

const scanner = () => {
  fb.ref('/artists').on('value', (snapshot) => {
    if (process.env.POST_PROCESS) {
      execSync(process.env.POST_PROCESS);
    }
  });
};

export default scanner;
