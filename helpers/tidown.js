import Tidal from 'tidal-api-wrapper';
import path from 'path';
import qs from 'querystring';
import sanitize from 'sanitize-filename';
import fs from 'fs-extra';
import shell from 'shell-escape';
import { execSync } from 'child_process';
import Promise from 'bluebird';

/** Class */
class Tidown extends Tidal {
  /**
  *
  <p>
  userId and sessionId can be passed as options so that
  logging in is not neccessary.
  </p>
  * @param {object} [options] - options to be passed to Tidown
  * @param {string} [options.downloadPath] - path to download to
  * @param {number} [options.userId] - Tidal user id
  * @param {string} [options.sessionId] - Tidal sessionId
  * @param {string} [options.quality] - quality of music file downloads ['LOW', 'HIGH', 'LOSSLESS']
  */
  constructor(options = {}) {
    super();
    this.downloadPath = options.downloadPath || path.join(__dirname, '../downloads');
    this.userId = options.userId;
    this.sessionId = options.sessionId;
    this.quality = options.quality || 'HIGH';

    // ensure the quality passed is valid
    const accQualities = ['LOW', 'HIGH', 'LOSSLESS'];
    if (accQualities.indexOf(this.quality) < 0) {
      throw new Error(`${this.quality} is not a valid quality ('LOW', 'HIGH', 'LOSSLESS')`);
    }

    // if sessionId is included then change the params
    // these params are inherited from tidal-api-wrapper class
    if (options.sessionId) {
      this.params = `${this.params}&sessionId=${options.sessionId}`;
    }
  }

  /**
  * login to Tidal to obtain userId and sessionId and countryCode
  * @param {string} username - Tidal username or email
  * @param {string} password - Tidal password
  */
  async login(username, password) {

    // make sure username and password are valid
    if (!username || !password) {
      throw new Error('username and password are required arguments');
    }

    try {

      // using the ios token as to only get back .m4a and .mp3 files
      const params = qs.stringify({
        username,
        password,
        clientVersion: '2.1.2',
      });

      // this method comes from tidal-api-wrapper
      const res = await this.api({
        method: 'POST',
        url: '/login/username?token=GvFhCVAYp3n43EN3',
        data: params,
      });

      // store this info for use in other methods
      this.userId = res.data.userId;
      this.sessionId = res.data.sessionId;
      this.countryCode = res.data.countryCode;
      this.params = `${this.params}&sessionId=${res.data.sessionId}`;

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  // method to check credentials
  // this should be called in any method that requires a sessionId
  checkCredentials() {
    if (!this.sessionId) {
      throw new Error('You must call the login() method first.');
    }
  }

  /**
  * get the url for the track stream from Tidal
  * @param {number} id - Tidal track id
  */
  async getStreamUrl(id) {

    this.checkCredentials();

    try {

      const res = await this.api({
        method: 'GET',
        url: `/tracks/${id}/streamUrl?${this.params}&soundQuality=${this.quality}`,
      });

      return res.data.url;
    } catch (e) {
      throw e;
    }

  }

  /**
  * fetch the stream for a track from tidal which can then be piped to a writeStream
  * @param {number} id - Tidal track id
  */
  async getStream(id) {

    try {

      const url = await this.getStreamUrl(id);

      const stream = await this.api({
        method: 'GET',
        url,
        responseType: 'stream',
      });

      // get the file type (sometimes desired isn't available)
      let fileType = url.split('?__token')[0].split('.');
      fileType = fileType[fileType.length - 1];

      return {
        stream: stream.data,
        codec: fileType,
      };

    } catch (e) {
      throw e;
    }
  }

  /**
  * create the neccessary directories if they don't exist
  * @param {string} artist - artist name
  * @param {string} album - album name
  */
  mkdirs(artist, album) {

    const artistPath = `${this.downloadPath}/${sanitize(artist)}`;
    const albumPath = `${artistPath}/${sanitize(album)}`;

    try {

      if (!fs.existsSync(this.downloadPath)) {
        fs.mkdirSync(this.downloadPath);
      }

      if (!fs.existsSync(artistPath)) {
        fs.mkdirSync(artistPath);
      }

      if (!fs.existsSync(albumPath)) {
        fs.mkdirSync(albumPath);
      }

      return albumPath;


    } catch (e) {
      throw e;
    }

  }

  /**
  * write the track stream to the file system
  * @param stream - track stream which is return from Tidown.getStream
  * @param {Object} meta - track metadata
  * @param {string} fullPath - the absolute path that the track should be written to
  */
  writeTrack(stream, meta, fullPath) {
    return new Promise((resolve, reject) => {
    // set double digit track number
      const trackNum = meta.trackNumber < 10 ? `0${meta.trackNumber}` : meta.trackNumber;

      const filename = `${trackNum}. ${sanitize(meta.title)}.${meta.codec}`;

      const file = fs.createWriteStream(`${fullPath}/${filename}`);

      stream.pipe(file);

      file.on('close', () => {
        resolve(`${fullPath}/${filename}`);
      });

      file.on('error', (err) => {
        reject(err);
      });
    });
  }

  /**
  * download and write the album art for a track
  * @param {Object} album - album object from other tidal-api-wrapper methods
  * @param {string} albumPath - absolute path to the album folder where the image should be saved
  */
  async downloadArtwork(album, albumPath) {

    // call the albumArtToUrl method if it has not already been called
    // this method is inherited from tidal-api-wrapper
    if (typeof (album.cover) === 'string') {
      album.cover = this.albumArtToUrl(album.cover);
    }

    try {

      const res = await this.api({
        method: 'GET',
        url: album.cover.xl,
        responseType: 'arraybuffer',
      });

      fs.writeFileSync(`${albumPath}/cover.jpg`, res.data);

      return `${albumPath}/cover.jpg`;

    } catch (e) {
      throw e;
    }

  }

  /**
  * tag the track with metadata and album art (mp4v2 is a dependency)
  * @param {string} file - the absolute path to the file to be tagged
  * @param {Object} meta - track metadata
  * @param {string} cover - the absolute path to the album art image
  */
  tagTrack(file, meta, cover) {

    const tag = [
      'mp4tags',
      '--artist', meta.artist.name,
      '--albumartist', meta.album.artist.name,
      '--album', meta.album.title,
      '--disk', meta.volumeNumber,
      '--song', meta.title,
      '--year', meta.album.releaseDate.substring(0, 4),
      '--track', meta.trackNumber,
      '--tracks', meta.album.numberOfTracks,
      '--copyright', meta.copyright,
      file,
    ];

    execSync(shell(tag));

    const art = [
      'mp4art', '--add',
      cover, file,
    ];

    execSync(shell(art));

  }

  /**
  * download and tag a track
  * @param {number} id - the Tidal track id
  */
  async downloadTrack(id) {

    try {

      const track = await this.getTrack(id);

      const album = await this.getAlbum(track.album.id);

      const { stream, codec } = await this.getStream(track.id);

      track.album = album;
      track.codec = codec;

      const albumPath = await this.mkdirs(album.artist.name, album.title);

      const image = await this.downloadArtwork(album, albumPath);

      const file = await this.writeTrack(stream, track, albumPath);

      await this.tagTrack(file, track, image);

      track.path = file;

      return {
        ...track,
        albumPath,
      };
    } catch (e) {
      throw e;
    }
  }

  /**
  * download an entire album
  * @param {number} id - the Tidal album id
  */
  async downloadAlbum(id) {

    try {
      // most of these methods are inherited from tidal-api-wrapper
      const album = await this.getAlbum(id);

      const tracks = await this.getAlbumTracks(id);

      const albumPath = this.mkdirs(album.artist.name, album.title);

      const image = await this.downloadArtwork(album, albumPath);

      const tracksWithPaths = await Promise.map(tracks, async (track) => {

        const { stream, codec } = await this.getStream(track.id);

        track.album = album;
        track.codec = codec;

        const file = await this.writeTrack(stream, track, albumPath);
        // tag the track with metadata and artwork
        await this.tagTrack(file, track, image);
        // append the path to the track for database purposes
        return {
          ...track,
          path: file,
        };
      });

      // return album and track info for database purposes
      return {
        ...album,
        path: albumPath,
        tracks: {
          ...tracksWithPaths,
        },
      };

    } catch (e) {
      throw e;
    }
  }


}

export default Tidown;
