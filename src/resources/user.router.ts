import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { User_by } from '../entity/user.entity';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.route('/').get(async (req, res) => {
  try {
    console.log(req);
    const users = await repeatlDataSource
      .getRepository(User_by)
      .find();
    res.json(users);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/').post(async (req, res) => {
  try {
    console.log('body of usr is', req.body);
    const user = await repeatlDataSource
      .getRepository(User_by)
      .create(req.body);
    const results = await repeatlDataSource
      .getRepository(User_by)
      .save(user);
    return res
      .status(StatusCodes.OK)
      .send(results);
  } catch (error) {
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send(error);
  }
});

export { router as userRouter };
