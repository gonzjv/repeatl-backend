import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  addWordSectionState,
  getWordSectionState,
  getWordSectionStateArr,
} from './wordSectionState.service';

const router = Router();

router.route('/').get(async (_, res) => {
  try {
    const wordSectionStateArr =
      await getWordSectionStateArr();
    res.json(wordSectionStateArr);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:collectionStateId.:wordSectionId')
  .get(async (req, res) => {
    try {
      const collectionState = await getWordSectionState(
        Number(req.params.collectionStateId),
        Number(req.params.wordSectionId)
      );
      res.json(collectionState);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send(error);
    }
  });

router
  .route('/:collectionStateId.:wordSectionId')
  .post(async (req, res) => {
    try {
      const results = await addWordSectionState(
        Number(req.params.collectionStateId),
        Number(req.params.wordSectionId)
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

export { router as wordSectionStateRouter };
