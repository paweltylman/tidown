import { execSync } from 'child_process';
import { fb } from '../app';

const scanner = () => {
  fb.ref('/queue').on('child_removed', (snapshot) => {
    if (!snapshot.val()) {
      if (process.env.POST_PROCESS) {
        execSync(process.env.POST_PROCESS);
      }
    }
  });
};

export default scanner;
