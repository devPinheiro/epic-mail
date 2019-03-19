import express from 'express';
import logger from 'morgan';
import swagger from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json';
import userRoute from './api/V1/routes/userRouter';
import messageRoute from './api/V1/routes/messageRouter';

/**
 *
 * instantiate express app
 *  */
const app = express();


/**
 *
 * setup port
 *  */
const PORT = process.env.PORT || 4100;

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
app.get('/', (req, res) => res.status(200).json('Welcome to EPIC mail'));
app.use('/api/v1', userRoute);
app.use('/api/v1', messageRoute);

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


app.listen(PORT);
console.log(`server listening on ${PORT}`);
export default app;
