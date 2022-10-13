import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { ModelSubCollection } from '../entity/modelSubCollection.entity';
import { ModelSection } from '../entity/modelSection.entity';

const router = Router();
const modelSubCollectionRepo =
  repeatlDataSource.getRepository(
    ModelSubCollection
  );
const modelSectionRepo =
  repeatlDataSource.getRepository(ModelSection);

router.route('/').get(async (_, res) => {
  try {
    const modelSections =
      await modelSectionRepo.find({
        relations: {
          modelSubCollection: true,
          models: true,
        },
      });
    res.json(modelSections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:modelSubCollectionId')
  .get(async (req, res) => {
    try {
      const modelSections =
        await modelSectionRepo.find({
          relations: {
            modelSubCollection: true,
            models: true,
          },
          where: {
            modelSubCollection: {
              id: Number(
                req.params.modelSubCollectionId
              ),
            },
          },
        });
      res.json(modelSections);
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(error);
    }
  });

router
  .route('/:modelSubCollectionId')
  .post(async (req, res) => {
    try {
      const modelSubCollection =
        await modelSubCollectionRepo.findOneBy({
          id: Number(
            req.params.modelSubCollectionId
          ),
        });

      const modelSection =
        modelSectionRepo.create({
          label: req.body.label,
          number: req.body.number,
          modelSubCollection: modelSubCollection!,
        });

      const results = await modelSectionRepo.save(
        modelSection
      );
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
    const elemToRemove =
      await modelSectionRepo.findOneBy({
        id: Number(req.params.id),
      });
    if (elemToRemove) {
      await modelSectionRepo.remove(elemToRemove);
      return res
        .status(StatusCodes.OK)
        .send(elemToRemove);
    }
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send('modelSection is not exist');
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(error);
  }
});

export { router as modelSectionRouter };
