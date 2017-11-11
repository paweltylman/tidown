import { execSync } from 'child_process';
import { fb } from '../app';

const scanner = () => {
  fb.ref('/albums/queue').on('child_removed', (snapshot) => {
    fb.ref('/albums/queue').once('value', (snap) => {
      const albums = snap.val();
      if (albums === null) {
        execSync(process.env.POST_PROCESS);
      }
    });
  });
};

export default scanner;
