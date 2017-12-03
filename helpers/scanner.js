import { execSync } from 'child_process';
import { fb } from '../app';

const scanner = () => {
  fb.ref('/queue').on('child_removed', async (snapshot) => {
    const albums = await fb.ref('/queue/albums').once('value');
    if (!albums.val()) {
      if (process.env.POST_PROCESS) {
        execSync(process.env.POST_PROCESS);
      }
    }
  });
};

export default scanner;
