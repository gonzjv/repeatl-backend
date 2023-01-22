import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  addProgress,
  getProgress,
  getProgressArr,
} from './progress.service';

const router = Router();

router.route('/').get(async (_, res) => {
  try {
    const progressArr = await getProgressArr();
    res.json(progressArr);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/:userId').get(async (req, res) => {
  try {
    const progress = await getProgress(
      Number(req.params.userId)
    );
    res.json(progress);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/:userId').post(async (req, res) => {
  try {
    const results = await addProgress(
      Number(req.params.userId)
    );
    return res.status(StatusCodes.OK).send(results);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
});

// router.route('/:id').delete(async (req, res) => {
//   try {
//     const elemToRemove = await wordRepo.findOneBy({
//       id: Number(req.params.id),
//     });
//     if (elemToRemove) {
//       await wordRepo.remove(elemToRemove);
//       return res.status(StatusCodes.OK).send(elemToRemove);
//     }
//     return res
//       .status(StatusCodes.NOT_ACCEPTABLE)
//       .send('element is not exist');
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST).send(error);
//   }
// });

export { router as progressRouter };
