import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Course } from '../entity/course.entity';
import multer from 'multer';
import path from 'path';
import * as courseService from './course.service';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, __dirname);
  },
  filename: (_, file, callback) => {
    callback(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const router = Router();
const courseRepo =
  repeatlDataSource.getRepository(Course);
// const collectionRepo =
//   repeatlDataSource.getRepository(Collection);

router.route('/').get(async (_, res) => {
  try {
    const courses = await courseRepo.find({
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

router
  .route('/upload/csv/:courseId')
  .post(
    upload.single('csvFile'),
    async (req, res) => {
      try {
        const csvFilePath = `${req.file?.path}`;
        console.log('file', csvFilePath);

        await courseService.addDataFromCsv(
          csvFilePath,
          req.params.courseId
        );

        await courseService.deleteFile(
          csvFilePath
        );

        return res.status(StatusCodes.OK).send({
          success: true,
          msg: 'data is saved into DB',
        });
      } catch (error) {
        res
          .status(StatusCodes.NOT_ACCEPTABLE)
          .send(error);
      }
    }
  );

export { router as courseRouter };
