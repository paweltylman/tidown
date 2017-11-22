import express from 'express';
import Promise from 'bluebird';
import { tidown, fb } from '../app';

const router = express.Router();

router.post('/album', async (req, res) => {

  const { id } = req.body.album;

  try {

    await fb.ref('/albums/queue').child(`${id}`).set(req.body.album);

    const album = await tidown.downloadAlbum(id);

    const artist = await tidown.getArtist(album.artist.id);

    const time = new Date().getTime();

    album.downloaded = time;
    artist.lastDownload = time;

    if (artist.picture) {
      artist.picture = tidown.artistPicToUrl(artist.picture);
    } else {
      artist.picture = {
        sm: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
        md: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
        lg: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
      };
    }

    const tracks = Object.keys(album.tracks).map(index => album.tracks[index]);

    await Promise.map(tracks, track =>
      fb.ref('/tracks/available').child(track.id).set(track));

    await fb.ref('/albums/available').child(id).set(album);

    await fb.ref('/albums/queue').child(id).remove();

    await fb.ref('/artists').child(artist.id).set(artist);

    res.status(200).send({
      message: 'Successfully downloaded album.',
      album,
    });

  } catch (e) {

    await fb.ref('/albums/error').child(id).set(id);

    await fb.ref('/albums/queue').child(id).remove();

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
