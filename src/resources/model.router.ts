import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Model } from '../entity/model.entity';
import { ModelSubCollection } from '../entity/modelSubCollection.entity';

const router = Router();
const modelRepo =
  repeatlDataSource.getRepository(Model);
const modelSubCollectionRepo =
  repeatlDataSource.getRepository(
    ModelSubCollection
  );

router.route('/').get(async (_, res) => {
  try {
    const model = await modelRepo.find({
      relations: {
        modelSubCollection: true,
      },
    });
    res.json(model);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:modelSubCollectionId')
  .get(async (req, res) => {
    try {
      const models = await modelRepo.find({
        relations: {
          modelSubCollection: true,
        },
        where: {
          modelSubCollection: {
            id: Number(
              req.params.modelSubCollectionId
            ),
          },
        },
      });
      res.json(models);
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

      const model = modelRepo.create({
        label: req.body.label,
        phrase1: req.body.phrase1,
        phrase2: req.body.phrase2,
        phrase3: req.body.phrase3,
        number: req.body.number,
        modelSubCollection: modelSubCollection!,
      });

      const results = await modelRepo.save(model);
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
      await modelRepo.findOneBy({
        id: Number(req.params.id),
      });
    if (elemToRemove) {
      await modelRepo.remove(elemToRemove);
      return res
        .status(StatusCodes.OK)
        .send(elemToRemove);
    }
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send('element is not exist');
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(error);
  }
});

export { router as modelRouter };
