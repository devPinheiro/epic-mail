import express from 'express';
import logger from 'morgan';
import swagger from 'swagger-ui-express';
import { apiRouter } from './api/V1';
import swaggerDocument from './config/swagger.json';

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
const hostname = 'localhost' || '0.0.0.0';

/**
 * set up middleware
 * @method express.json() parses incoming requests with JSON payloads based on body-parser
 *
 * @method express.urlencoded() parses incoming requests with urlencode payloads
 *  */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// api endpoints
app.use('/api/v1', apiRouter);

// swagger api docs endpoint
const options = {
  explorer: true,
};
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument, options));

app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404).json({
    message: 'Invalid route',
  });
  next(error);
});


app.listen(PORT, hostname, () => {
  console.log(`server listening on https://${hostname}:${PORT}`);
});

export default app;
