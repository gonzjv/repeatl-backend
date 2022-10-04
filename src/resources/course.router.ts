import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Course } from '../entity/course.entity';

const router = Router();
const courseRepo =
  repeatlDataSource.getRepository(Course);

router.route('/').get(async (_, res) => {
  try {
    const courses = await repeatlDataSource
      .getRepository(Course)
      .find({
        relations: {
          collections: true,
        },
      });

    res.json(courses);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/').post(async (req, res) => {
  try {
    console.log('body of course is', req.body);
    const course = courseRepo.create(req.body);
    const results = await courseRepo.save(course);
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
  .route('/:courseId')
  .delete(async (req, res) => {
    try {
      const courseToRemove =
        await courseRepo.findOneBy({
          id: Number(req.params.courseId),
        });
      courseToRemove &&
        (await courseRepo.remove(courseToRemove));
      return res
        .status(StatusCodes.OK)
        .send(courseToRemove);
    } catch (error) {
      res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .send(error);
    }
  });

export { router as courseRouter };
