import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { ModelSubCollection } from '../entity/modelSubCollection.entity';
import { Collection } from '../entity/collection.entity';

const router = Router();
const modelSubCollectionRepo =
  repeatlDataSource.getRepository(
    ModelSubCollection
  );
const collectionRepo =
  repeatlDataSource.getRepository(Collection);

router.route('/').get(async (_, res) => {
  try {
    const modelSubCollections =
      await modelSubCollectionRepo.find({
        relations: {
          collection: true,
        },
      });
    res.json(modelSubCollections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:collectionId')
  .get(async (req, res) => {
    try {
      const modelSubcollections =
        await modelSubCollectionRepo.find({
          relations: {
            collection: true,
          },
          where: {
            collection: {
              id: Number(req.params.collectionId),
            },
          },
        });
      res.json(modelSubcollections);
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(error);
    }
  });

router
  .route('/:collectionId')
  .post(async (req, res) => {
    try {
      const collection =
        await collectionRepo.findOneBy({
          id: Number(req.params.collectionId),
        });

      const modelSubCollection =
        modelSubCollectionRepo.create({
          label: req.body.label,
          collection: collection!,
        });

      const results =
        await modelSubCollectionRepo.save(
          modelSubCollection
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
      await modelSubCollectionRepo.findOneBy({
        id: Number(req.params.id),
      });
    if (elemToRemove) {
      await modelSubCollectionRepo.remove(
        elemToRemove
      );
      return res
        .status(StatusCodes.OK)
        .send(elemToRemove);
    }
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send('modelSubCollection is not exist');
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(error);
  }
});

export { router as modelSubCollectionRouter };
