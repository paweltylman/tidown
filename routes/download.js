import express from 'express';
import fs from 'fs-extra';
import { tidown, fb } from '../app';

const router = express.Router();

router.post('/album/available', async (req, res) => {

  const { album } = req.body;

  try {

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

    await fb.ref('/albums/error').child(album.id).set(album);

    res.status(400).send({
      message: 'An error occurred.',
    });
  }

});

router.post('/album/unavailable', async (req, res) => {

  try {

    const { id } = req.body.album;

    const album = await tidown.downloadAlbum(id);

    await res.zip({
      files: [
        {
          path: album.path,
          name: `${album.artist.name} - ${album.title}`,
        },
      ],
      filename: `${album.artist.name} - ${album.title}.zip`,
    });

    fs.removeSync(album.path);

  } catch (e) {

    res.status(400).send({
      message: 'An error occurred.',
    });
  }

});

export default router;
