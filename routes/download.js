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

  if (!id) {
    return res.status(400).send({
      ok: false,
      message: 'id is required',
    });
  }

  const album = await tidown.downloadAlbum(id);

  const { path, title } = album;
  const artist = album.artist.name;

  try {

    return res.zip({
      files: [
        {
          path,
          name: `${artist} - ${title}`,
        },
      ],
      filename: `${artist} - ${title}.zip`,
    });

  } catch (e) {

    return res.status(400).send({
      message: 'An error occurred.',
    });

  }
});

router.post('/track', async (req, res) => {

  const { id } = req.body;

  if (!id) {
    return res.status(400).send({
      ok: false,
      message: 'id is required',
    });
  }

  const track = await tidown.downloadTrack(id);

  const { path } = track;

  try {

    return res.download(path, (err) => {
      if (err) {
        throw err;
      }

    });

  } catch (e) {

    return res.status(400).send({
      message: 'An error occurred.',
    });

  }

});

export default router;
