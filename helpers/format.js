// formats JSON for the database
import { tidown, fb } from '../app';

const format = async (album) => {

  const fbArtist = await fb.ref(`/artists/${album.artist.id}`).once('value');
  const artist = fbArtist.val();

  // manually timestamp
  const now = new Date().getTime();

  if (artist) {
    return {
      ...artist,
      lastDownload: now,
      albums: {
        ...artist.albums,
        [album.id]: album,
      },
    };
  }

  const newArtist = await tidown.getArtist(album.artist.id);

  if (newArtist.picture) {
    newArtist.picture = tidown.artistPicToUrl(newArtist.picture);
  } else {
    // generic artwork from Tidal
    newArtist.picture = {
      sm: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
      md: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
      lg: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
    };
  }

  return {
    id: newArtist.id,
    name: newArtist.name,
    picture: newArtist.picture,
    lastDownload: now,
    albums: {
      [album.id]: album,
    },
  };


};

export default format;
