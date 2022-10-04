import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Collection } from '../entity/collection.entity';
import { Course } from '../entity/course.entity';

const router = Router();
const { manager } = repeatlDataSource;
const collectionRepo =
  repeatlDataSource.getRepository(Collection);

router.route('/').get(async (_, res) => {
  try {
    const collections = await collectionRepo.find(
      {
        relations: {
          course: true,
        },
      }
    );
    res.json(collections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const course = await manager.findOneBy(
      Course,
      {
        id: 2,
      }
    );

    const collection = manager.create(
      Collection,
      {
        name: req.body.name,
        course: course!,
      }
    );

    const results = await manager.save(
      collection
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

router
  .route('/:collectionID')
  .delete(async (req, res) => {
    try {
      const collectionToRemove =
        await collectionRepo.findOneBy({
          id: Number(req.params.collectionID),
        });
      if (collectionToRemove) {
        await collectionRepo.remove(
          collectionToRemove
        );
        return res
          .status(StatusCodes.OK)
          .send(collectionToRemove);
      }
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .send('collection is not exist');
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(error);
    }
  });

export { router as collectionRouter };
