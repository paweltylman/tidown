import express from 'express';
import fs from 'fs-extra';
import { tidown, fb } from '../app';

const router = express.Router();

router.get('/album/available', async (req, res) => {

  const { id } = req.query;

  try {

    const snapshot = await fb.ref(`/albums/available/${id}`).once('value');
    const album = snapshot.val();

    await res.zip({
      files: [
        {
          path: album.path,
          name: `${album.artist.name} - ${album.title}`,
        },
      ],
      filename: `${album.artist.name} - ${album.title}.zip`,
    });

  } catch (e) {

    res.status(400).send({
      message: 'An error occurred.',
    });

  }
});

router.post('/album/temporary', async (req, res) => {

  const { id } = req.body;

  try {

    const album = await tidown.downloadAlbum(id, false);

    await fb.ref('/albums/temporary').child(id).set(album);

    res.status(200).send({
      album,
    });

  } catch (e) {

    res.status(400).send({
      message: 'An error occurred.',
    });

  }
});

router.get('/album/temporary', async (req, res) => {

  const { id } = req.query;

  try {

    const snapshot = await fb.ref(`/albums/temporary/${id}`).once('value');
    const album = snapshot.val();

    await res.zip({
      files: [
        {
          path: album.path,
          name: `${album.artist.name} - ${album.title}`,
        },
      ],
      filename: `${album.artist.name} - ${album.title}.zip`,
    });

    await fb.ref('/albums/temporary').child(album.id).remove();

    fs.removeSync(album.path);

  } catch (e) {

    res.status(400).send({
      message: 'An error occurred.',
    });

  }

});

router.post('/track', async (req, res) => {

  const { id } = req.body;

  try {

    const track = await tidown.downloadTrack(id, false);

    // await fb.ref('/tracks/temporary').child(id).set(track);

    res.status(200).send(track);

  } catch (e) {

    res.status(400).send({
      message: 'An error occurred.',
    });

  }
});

router.get('/track', async (req, res) => {

  const { path } = req.query;

  try {

    // const snapshot = await fb.ref('/tracks/temporary').child(id).once('value');
    // const track = snapshot.val();

    res.download(path, async (err) => {
      if (err) {
        throw err;
      }

      // await fb.ref('/tracks/temporary').child(id).remove();

    });

  } catch (e) {

    res.status(400).send({
      message: 'An error occurred.',
    });

  }

});

export default router;
