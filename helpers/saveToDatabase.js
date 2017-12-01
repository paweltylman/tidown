// formats JSON for the database
import Promise from 'bluebird';
import { tidown, fb } from '../app';

const saveToDatabase = async (album) => {

  try {

    let { artist } = album;
    const { tracks } = album;

    // check if artist exists in the database already
    const fbArtist = await fb.ref(`/artists/${artist.id}`).once('value');

    // manual timestamp
    const now = new Date().getTime();
    album.downloaded = now;

    // assign artist value (this is a mess... should be refactored)
    if (fbArtist.val()) {
      artist = {
        ...fbArtist.val(),
        lastDownload: now,
        albums: {
          ...fbArtist.val().albums,
          [album.id]: album,
        },
      };
    } else {
      artist = {
        ...album.artist,
        lastDownload: now,
        albums: {
          [album.id]: album,
        },
      };
    }

    await Promise.all([
      fb.ref(`/artists/${artist.id}`).set(artist),
      fb.ref(`/albums/${album.id}`).set(album),
      Promise.map(tracks, track => fb.ref(`/tracks/${track.id}`).set(track)),
    ]);

  } catch (e) {
    throw e;
  }

};

export default saveToDatabase;
