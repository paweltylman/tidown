import bodyParser from 'body-parser';
import Debug from 'debug';
import express from 'express';
import queue from 'express-queue';
import logger from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import firebase from 'firebase';
import cors from 'cors';
import zip from 'express-easy-zip';
import fbConfig from './fbConfig';
import Tidown from './helpers/tidown';
import scanner from './helpers/scanner';

import plex from './routes/plex';
import download from './routes/download';

// start dotenv
dotenv.config();

// firebase init
firebase.initializeApp(fbConfig);
export const fb = firebase.database();

export const tidown = new Tidown({
  sessionId: process.env.SESSIONID,
  downloadPath: process.env.DOWNLOAD_PATH,
});

const app = express();
const debug = Debug('tidown-api:app');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// cors setup
app.use(cors());

// easy zip
app.use(zip());

app.use('/plex', queue({ activeLimit: 5, queuedLimit: -1 }));
app.use('/download', download);

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

// start the plex scanner
scanner();

export default app;
