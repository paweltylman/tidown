import { execSync } from 'child_process';
import { fb } from '../app';

const scanner = () => {
  fb.ref('/albums').on('child_added', (snapshot) => {
    if (process.env.POST_PROCESS) {
      execSync(process.env.POST_PROCESS);
    }
  });
};

export default scanner;
