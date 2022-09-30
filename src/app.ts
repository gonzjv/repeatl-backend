import express from 'express';
import { stdout } from 'process';
import { PORT_NODE_HOST } from './common/config';
import {} from 'typeorm';
import { repeatlDataSource } from '../app-data-source';

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
// app.use('/users', usersRouter);
// app.use('/boards', boardRouter);
// app.use('/boards', taskRouter);
// app.use(handleUserError);

app.listen(PORT_NODE_HOST, () => {
  stdout.write(
    `Where connection to postgres???? App is running on http://localhost:${PORT_NODE_HOST} \n`
  );
});
