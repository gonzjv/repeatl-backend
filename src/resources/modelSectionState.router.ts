import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  addModelSecionState,
  completeModelSection,
  getModelSectionState,
  getModelSectionStateArr,
} from './modelSectionState.service';

const router = Router();

router.route('/').get(async (_, res) => {
  try {
    const modelSectionStateArr =
      await getModelSectionStateArr();
    res.json(modelSectionStateArr);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:collectionStateId.:modelSectionId')
  .get(async (req, res) => {
    try {
      const collectionState = await getModelSectionState(
        Number(req.params.collectionStateId),
        Number(req.params.modelSectionId)
      );
      res.json(collectionState);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send(error);
    }
  });

router
  .route('/:collectionStateId.:modelSectionId')
  .post(async (req, res) => {
    try {
      const results = await addModelSecionState(
        Number(req.params.collectionStateId),
        Number(req.params.modelSectionId)
      );
      return res.status(StatusCodes.OK).send(results);
    } catch (error) {
      res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
    }
  });

router.route('/').put(async (req, res) => {
  const { modelSectionState } = req.body;
  try {
    const results = await completeModelSection(
      modelSectionState
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

export { router as modelSectionStateRouter };
