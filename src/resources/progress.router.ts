import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
// import { repeatlDataSource } from '../../app-data-source';
// import { Progress } from '../entity/progress.entity';
import {
  addProgress,
  getProgressArr,
} from './progress.service';

const router = Router();
// const progressRepo =
//   repeatlDataSource.getRepository(Progress);

router.route('/').get(async (_, res) => {
  try {
    const progressArr = await getProgressArr();
    res.json(progressArr);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

// router.route('/:wordSectionId').get(async (req, res) => {
//   try {
//     const wordArr = await getWordArr(
//       Number(req.params.wordSectionId)
//     );
//     res.json(wordArr);
//   } catch (error) {
//     res.status(StatusCodes.NOT_FOUND).send(error);
//   }
// });

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
