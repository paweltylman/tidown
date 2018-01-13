import express from 'express';
import fs from 'fs-extra';
import { tidown } from '../app';

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.json({
    ok: true,
  });
});

router.post('/album', async (req, res) => {

  const { id } = req.body;

  const album = await tidown.downloadAlbum(id);

  const { path, title } = album;
  const artist = album.artist.name;

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

router.post('/track', async (req, res) => {

  const { id } = req.body;

  const track = await tidown.downloadTrack(id);

  const { path } = track;

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
