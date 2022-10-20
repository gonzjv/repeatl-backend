import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Model } from '../entity/model.entity';
import { Phrase } from '../entity/phrase.entity';
import { ProgressModel } from '../entity/progressModel.entity';

const router = Router();
const modelRepo =
  repeatlDataSource.getRepository(Model);
const progressModelRepo =
  repeatlDataSource.getRepository(ProgressModel);

// router.route('/').get(async (_, res) => {
//   try {
//     const phrase = await phraseRepo.find({
//       relations: {
//         model: true,
//       },
//     });
//     res.json(phrase);
//   } catch (error) {
//     res.status(StatusCodes.NOT_FOUND).send(error);
//   }
// });

router
  .route('/:userId.:subCollectionId')
  .get(async (req, res) => {
    const { subCollectionId, userId } =
      req.params;
    try {
      const progressArr =
        await progressModelRepo.find({
          // relations: {
          //   model: true,
          // },
          where: {
            user: {
              id: Number(userId),
            },
          },
        });

      const progress = progressArr.find(
        (e) =>
          e.subCollectionId ==
          Number(subCollectionId)
      );
      res.json(progress);
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(error);
    }
  });

// router
//   .route('/:modelId')
//   .post(async (req, res) => {
//     try {
//       const model = await modelRepo.findOneBy({
//         id: Number(req.params.modelId),
//       });

//       const phrase = phraseRepo.create({
//         label: req.body.label,
//         native: req.body.native,
//         foreign: req.body.foreign,
//         model: model!,
//       });

//       const results = await phraseRepo.save(
//         phrase
//       );
//       return res
//         .status(StatusCodes.OK)
//         .send(results);
//     } catch (error) {
//       res
//         .status(StatusCodes.NOT_ACCEPTABLE)
//         .send(error);
//     }
//   });

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
