import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  addWordState,
  completeFirstRepeatBatch,
  completeWord,
  getWordState,
  getWordStateArr,
} from './wordState.service';

const router = Router();

router.route('/').get(async (_, res) => {
  try {
    const wordStateArr = await getWordStateArr();
    res.json(wordStateArr);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:wordSectionStateId.:wordId')
  .get(async (req, res) => {
    try {
      const collectionState = await getWordState(
        Number(req.params.wordSectionStateId),
        Number(req.params.wordId)
      );
      res.json(collectionState);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send(error);
    }
  });

router
  .route('/:wordSectionStateId.:wordId')
  .post(async (req, res) => {
    try {
      const results = await addWordState(
        Number(req.params.wordSectionStateId),
        Number(req.params.wordId)
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

router.route('/').put(async (req, res) => {
  const { wordStateId } = req.body;
  try {
    const results = await completeWord(wordStateId);
    return res.status(StatusCodes.OK).send(results);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
});

router
  .route('/firstRepeatComplete')
  .put(async (req, res) => {
    const { wordStateIdArr } = req.body;
    try {
      const results = await completeFirstRepeatBatch(
        wordStateIdArr
      );
      return res.status(StatusCodes.OK).send(results);
    } catch (error) {
      res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
    }
  });

export { router as wordStateRouter };
