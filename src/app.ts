import express from 'express'; // Response, // Request, // NextFunction,
import { stdout } from 'process';
import { PORT_NODE_HOST } from './common/config';
import {} from 'typeorm';
import { repeatlDataSource } from '../app-data-source';
import { userRouter } from './resources/user.router';
import { courseRouter } from './resources/course.router';
import { collectionRouter } from './resources/collection.router';
import cors from 'cors';
import { modelSubCollectionRouter } from './resources/modelSubCollection.router';
import { modelRouter } from './resources/model.router';
import { modelSectionRouter } from './resources/modelSection.router';
import { phraseRouter } from './resources/phrase.router';
import { progressModelRouter } from './resources/progressModel.router';
import { checkToken } from './common/helpers';
// import { checkToken } from './common/helpers';
// import { StatusCodes } from 'http-status-codes';

// establish database connection
repeatlDataSource
  .initialize()
  .then(() => {
    console.log(
      'Data Source has been initialized!'
    );
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization:',
      err
    );
  });

// create and setup express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  '/',
  (req, res, next): undefined | void => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  }
);

//checking token
// app.use(
//   (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     if (checkToken(req)) {
//       return next();
//     }
//     res
//       .status(StatusCodes.UNAUTHORIZED)
//       .end('invalid token');
//   }
// );

// register routes
app.use('/users', userRouter);
app.use('/courses', checkToken, courseRouter);
app.use(
  '/collections',
  checkToken,
  collectionRouter
);
app.use(
  '/modelSubCollections',
  checkToken,
  modelSubCollectionRouter
);
app.use(
  '/modelSections',
  checkToken,
  modelSectionRouter
);
app.use('/models', checkToken, modelRouter);
app.use('/phrases', checkToken, phraseRouter);
app.use(
  '/progressModels',
  checkToken,
  progressModelRouter
);

app.listen(PORT_NODE_HOST, () => {
  stdout.write(
    `App is running on http://localhost:${PORT_NODE_HOST} \n`
  );
});
