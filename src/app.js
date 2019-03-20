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
app.use(express.urlencoded({
  extended: true,
}));
app.use(logger('dev'));

// api endpoints
app.get('/', (req, res) => res.status(200).json('Welcome to EPIC mail'));
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/messages', messageRoute);

// swagger api docs endpoint
const options = {
  explorer: true,
};
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument, options));


app.listen(PORT);
console.log(`server listening on ${PORT}`);
export default app;
