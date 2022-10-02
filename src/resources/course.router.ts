import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Course } from '../entity/course.entity';

const router = Router();

router.route('/').get(async (req, res) => {
  try {
    console.log(req);
    const courses = await repeatlDataSource
      .getRepository(Course)
      .find();
    res.json(courses);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/').post(async (req, res) => {
  try {
    console.log('body of course is', req.body);
    const course = await repeatlDataSource
      .getRepository(Course)
      .create(req.body);
    const results = await repeatlDataSource
      .getRepository(Course)
      .save(course);
    return res
      .status(StatusCodes.OK)
      .send(results);
  } catch (error) {
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send(error);
  }
});

export { router as courseRouter };
