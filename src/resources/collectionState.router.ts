import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  addCollectionState,
  getCollectionsStateArr,
  getCollectionState,
} from './collectionState.service';

const router = Router();

router.route('/').get(async (_, res) => {
  try {
    const collectionStateArr =
      await getCollectionsStateArr();
    res.json(collectionStateArr);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:courseStateId.:collectionId')
  .get(async (req, res) => {
    try {
      const collectionState = await getCollectionState(
        Number(req.params.courseStateId),
        Number(req.params.collectionId)
      );
      res.json(collectionState);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send(error);
    }
  });

router
  .route('/:courseStateId.:collectionId')
  .post(async (req, res) => {
    try {
      const results = await addCollectionState(
        Number(req.params.courseStateId),
        Number(req.params.collectionId)
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

export { router as collectionStateRouter };
