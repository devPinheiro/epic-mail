import express from 'express';
import logger from 'morgan';
import { apiRouter } from './api/V1';

/**
 *
 * instantiate express app
 *  */
const app = express();


/**
 *
 * setup port
 *  */
const PORT = process.env.PORT || 4000;
const hostname = '0.0.0.0';

/**
 * set up middleware
 * @method express.json() parses incoming requests with JSON payloads based on body-parser
 *
 * @method express.urlencoded() parses incoming requests with urlencode payloads based on body-parser
 *  */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// api endpoints
app.use('/api/v1', apiRouter);


app.listen(PORT, hostname, () => {
  console.log(`server listening on https://${hostname}:${PORT}`);
});

export default app;
