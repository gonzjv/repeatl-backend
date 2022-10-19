import express from 'express';
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

// register routes
app.use('/users', userRouter);
app.use('/courses', courseRouter);
app.use('/collections', collectionRouter);
app.use(
  '/modelSubCollections',
  modelSubCollectionRouter
);
app.use('/modelSections', modelSectionRouter);
app.use('/models', modelRouter);
app.use('/phrases', phraseRouter);

app.listen(PORT_NODE_HOST, () => {
  stdout.write(
    `Where connection to postgres???? App is running on http://localhost:${PORT_NODE_HOST} \n`
  );
});
