import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Collection } from '../entity/collection.entity';
import { Course } from '../entity/course.entity';

const router = Router();
const { manager } = repeatlDataSource;

router.route('/').get(async (_, res) => {
  try {
    const collections = await repeatlDataSource
      .getRepository(Collection)
      .find({
        relations: {
          course: true,
        },
      });
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

    const courses = await repeatlDataSource
      .getRepository(Course)
      .find({
        relations: {
          collections: true,
        },
      });

    console.log('courses', courses);
    // const results = await repeatlDataSource
    //   .getRepository(Collection)
    //   .save(collection);
    return res
      .status(StatusCodes.OK)
      .send(results);
  } catch (error) {
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send(error);
  }
});

export { router as collectionRouter };
