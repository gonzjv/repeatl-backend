import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { ProgressModel } from '../entity/progressModel.entity';
import { User } from '../entity/user.entity';

const router = Router();
const userRepo = repeatlDataSource.getRepository(User);
const progressModelRepo =
  repeatlDataSource.getRepository(ProgressModel);

router.route('/').get(async (_, res) => {
  try {
    const progress = await progressModelRepo.find({
      relations: {
        user: true,
      },
    });
    res.json(progress);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:userId.:collectionId')
  .get(async (req, res) => {
    const { collectionId, userId } = req.params;
    try {
      const progressArr = await progressModelRepo.find({
        where: {
          user: {
            id: Number(userId),
          },
        },
      });

      const progress = progressArr.find(
        (e) => e.collectionId == Number(collectionId)
      );
      progress && res.json(progress);
      !progress &&
        res
          .status(StatusCodes.NOT_FOUND)
          .json('progress not found');
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send(error);
    }
  });

router.route('/').post(async (req, res) => {
  const {
    userId,
    modelStep,
    phraseStep,
    sectionStep,
    collectionId,
  } = req.body;
  try {
    const user = await userRepo.findOneBy({
      id: userId,
    });

    const progress = progressModelRepo.create({
      modelStep: modelStep,
      phraseStep: phraseStep,
      sectionStep: sectionStep,
      collectionId: collectionId,
      user: user!,
    });

    const results = await progressModelRepo.save(progress);
    return res.status(StatusCodes.OK).send(results);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
});

router.route('/').put(async (req, res) => {
  const { id, modelStep, phraseStep, sectionStep } =
    req.body;
  try {
    const elementToUpdate =
      await progressModelRepo.findOneBy({
        id: id,
      });

    elementToUpdate!.modelStep = modelStep;
    elementToUpdate!.phraseStep = phraseStep;
    elementToUpdate!.sectionStep = sectionStep;

    const results =
      elementToUpdate &&
      (await progressModelRepo.save(elementToUpdate));
    return res.status(StatusCodes.OK).send(results);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
});

// router.route('/:id').delete(async (req, res) => {
//   try {
//     const elemToRemove =
//       await phraseRepo.findOneBy({
//         id: Number(req.params.id),
//       });
//     if (elemToRemove) {
//       await phraseRepo.remove(elemToRemove);
//       return res
//         .status(StatusCodes.OK)
//         .send(elemToRemove);
//     }
//     return res
//       .status(StatusCodes.NOT_ACCEPTABLE)
//       .send('element is not exist');
//   } catch (error) {
//     res
//       .status(StatusCodes.BAD_REQUEST)
//       .send(error);
//   }
// });

export { router as progressModelRouter };
