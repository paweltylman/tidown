import { execSync } from 'child_process';
import { fb } from '../app';

const scanner = () => {
  fb.ref('/queue').on('child_removed', async (snapshot) => {
    const queue = await fb.ref('/queue/').once('value');
    if (!queue.val()) {
      if (process.env.POST_PROCESS) {
        execSync(process.env.POST_PROCESS);
      }
    }
  });
};

export default scanner;
