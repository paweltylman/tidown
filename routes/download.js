import express from 'express';
import fs from 'fs-extra';
import { tidown, fb } from '../app';

const router = express.Router();

router.get('/album', async (req, res) => {

  const { path, artist, album } = req.query;

  try {

    res.zip({
      files: [
        {
          path,
          name: `${artist} - ${album}`,
        },
      ],
      filename: `${artist} - ${album}.zip`,
    });

  } catch (e) {

    res.status(400).send({
      message: 'An error occurred.',
    });

  }
});

router.post('/album', async (req, res) => {

  const { id } = req.body;

  try {

    const album = await tidown.downloadAlbum(id, false);

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

    res.download(path, (err) => {
      if (err) {
        throw err;
      }

    });

  } catch (e) {

    res.status(400).send({
      message: 'An error occurred.',
    });

  }

});

export default router;
