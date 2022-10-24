import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { User } from '../entity/user.entity';
import { StatusCodes } from 'http-status-codes';

const router = Router();
const userRepo =
  repeatlDataSource.getRepository(User);

router.route('/').get(async (_, res) => {
  try {
    const users = await userRepo.find();
    res.json(users);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = userRepo.create(req.body);
    const results = await userRepo.save(user);
    return res
      .status(StatusCodes.OK)
      .send(results);
  } catch (error) {
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send(error);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const elemToRemove = await userRepo.findOneBy(
      {
        id: Number(req.params.id),
      }
    );
    if (elemToRemove) {
      await userRepo.remove(elemToRemove);
      return res
        .status(StatusCodes.OK)
        .send(elemToRemove);
    }
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send('element is not exist');
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(error);
  }
});

export { router as userRouter };
