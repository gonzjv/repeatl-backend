import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Course } from '../entity/course.entity';
import multer from 'multer';
import path from 'path';
import * as fs from 'node:fs';
// import path from 'node:path';
// import csvToJson from 'csvtojson';
import { addDataFromCsv } from './helpers';
// import { Collection } from '../entity/collection.entity';

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

        await addDataFromCsv(csvFilePath);

        fs.unlink(csvFilePath, (err) => {
          if (err && err.code == 'ENOENT') {
            console.info(
              "File doesn't exist, won't remove it."
            );
          } else if (err) {
            console.error(
              'Error occurred while trying to remove file'
            );
          } else {
            console.info(`temp file is removed`);
          }
        });

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
