import express from 'express';
import Promise from 'bluebird';
import { tidown, fb } from '../app';
import saveToDatabase from '../helpers/saveToDatabase';

const router = express.Router();

router.post('/album', async (req, res) => {

  let { album } = req.body;
  const { id } = album;

  try {

    await fb.ref(`/queue/${id}`).set(album);

    album = await tidown.downloadAlbum(id);
    await saveToDatabase(album);

    await fb.ref(`/queue/${id}`).remove();

    res.status(200).send({
      message: 'Successfully downloaded album.',
      album,
    });

  } catch (e) {

    await fb.ref(`/errors/${id}`).child(id).set(album);

    await fb.ref(`/queue/${id}`).child(id).remove();

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
