import express from 'express';
import Promise from 'bluebird';
import { tidown, fb } from '../app';

const router = express.Router();

router.post('/album', async (req, res) => {

  try {

    const { id } = req.body.album;

    await fb.ref('/albums/queue').child(`${id}`).set(req.body.album);

    const album = await tidown.downloadAlbum(id);

    album.downloaded = new Date().getTime();

    const tracks = Object.keys(album.tracks).map(index => album.tracks[index]);

    await Promise.map(tracks, track =>
      fb.ref('/tracks/available').child(track.id).set(track));

    await fb.ref('/albums/available').child(id).set(album);

    await fb.ref('/albums/queue').child(id).remove();

    res.status(200).send({
      message: 'Successfully downloaded album.',
      album,
    });

  } catch (e) {

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
