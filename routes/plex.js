import express from 'express';
import Promise from 'bluebird';
import { tidown, fb } from '../app';
import saveToDatabase from '../helpers/saveToDatabase';

const router = express.Router();

router.post('/album', async (req, res) => {

  const { id } = req.body.album;

  try {

    const album = await tidown.downloadAlbum(id);
    await saveToDatabase(album);

    res.status(200).send({
      message: 'Successfully downloaded album.',
      album,
    });

  } catch (e) {

    // await fb.ref('/albums/error').child(id).set(id);

    // await fb.ref('/albums/queue').child(id).remove();

    let message;

    if (e.response) {
      message = e.response.data.userMessage;
    } else {
      message = 'An unknown error occurred.';
    }

    res.status(400).send({
      message,
    });
  }

});

export default router;
