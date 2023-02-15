import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  addModelState,
  addModelStateArr,
  completeModel,
  getModelState,
  getModelStateArr,
} from './modelState.service';

const router = Router();

router.route('/').get(async (_, res) => {
  try {
    const modelStateArr = await getModelStateArr();
    res.json(modelStateArr);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:modelSectionStateId.:modelId')
  .get(async (req, res) => {
    try {
      const modelState = await getModelState(
        Number(req.params.modelSectionStateId),
        Number(req.params.modelId)
      );
      res.json(modelState);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send(error);
    }
  });

router
  .route('/:modelSectionStateId.:modelId')
  .post(async (req, res) => {
    try {
      const results = await addModelState(
        Number(req.params.modelSectionStateId),
        Number(req.params.modelId)
      );
      return res.status(StatusCodes.OK).send(results);
    } catch (error) {
      res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
    }
  });

router
  .route('/addArray/:modelSectionStateId')
  .post(async (req, res) => {
    try {
      const results = await addModelStateArr(
        Number(req.params.modelSectionStateId)
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
  const { modelStateId } = req.body;
  try {
    const results = await completeModel(modelStateId);
    return res.status(StatusCodes.OK).send(results);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
});

export { router as modelStateRouter };
