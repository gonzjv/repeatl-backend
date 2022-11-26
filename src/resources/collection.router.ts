import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Collection } from '../entity/collection.entity';
import { Course } from '../entity/course.entity';

const router = Router();
const collectionRepo =
  repeatlDataSource.getRepository(Collection);
const courseRepo =
  repeatlDataSource.getRepository(Course);

router.route('/').get(async (_, res) => {
  try {
    const collections = await collectionRepo.find(
      {
        relations: {
          course: true,
          modelSections: {
            models: {
              phrases: true,
            },
          },
        },
      }
    );
    res.json(collections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:courseId')
  .get(async (req, res) => {
    try {
      const collections =
        await collectionRepo.find({
          relations: {
            course: true,
            modelSections: {
              models: { phrases: true },
            },
          },
          where: {
            course: {
              id: Number(req.params.courseId),
            },
          },
        });
      res.json(collections);
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(error);
    }
  });

router
  .route('/id/:collectionId')
  .get(async (req, res) => {
    try {
      const collection =
        await collectionRepo.findOne({
          where: {
            id: Number(req.params.collectionId),
          },
          relations: {
            modelSections: true,
          },
        });
      res.json(collection);
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(error);
    }
  });

router
  .route('/:courseId')
  .post(async (req, res) => {
    try {
      const course = await courseRepo.findOneBy({
        id: Number(req.params.courseId),
      });

      const collection = collectionRepo.create({
        number: req.body.number,
        course: course!,
      });

      const results = await collectionRepo.save(
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
