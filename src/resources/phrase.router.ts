import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Model } from '../entity/model.entity';
import { Phrase } from '../entity/phrase.entity';
import multer from 'multer';
import path from 'path';
// import * as fs from 'node:fs';
// import path from 'node:path';
import csvToJson from 'csvtojson';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_, file, callback) => {
    callback(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

// const upload = multer({
//   dest: 'uploads/',
// });

const upload = multer({
  storage: storage,
});

const router = Router();
const modelRepo =
  repeatlDataSource.getRepository(Model);
const phraseRepo =
  repeatlDataSource.getRepository(Phrase);

router.route('/').get(async (_, res) => {
  try {
    const phrase = await phraseRepo.find({
      relations: {
        model: true,
      },
    });
    res.json(phrase);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:modelId')
  .get(async (req, res) => {
    try {
      const phrases = await phraseRepo.find({
        relations: {
          model: true,
        },
        where: {
          model: {
            id: Number(req.params.modelId),
          },
        },
      });
      res.json(phrases);
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(error);
    }
  });

router
  .route('/:modelId')
  .post(async (req, res) => {
    try {
      const model = await modelRepo.findOneBy({
        id: Number(req.params.modelId),
      });

      const phrase = phraseRepo.create({
        label: req.body.label,
        native: req.body.native,
        foreign: req.body.foreign,
        model: model!,
      });

      const results = await phraseRepo.save(
        phrase
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
      await phraseRepo.findOneBy({
        id: Number(req.params.id),
      });
    if (elemToRemove) {
      await phraseRepo.remove(elemToRemove);
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

router
  .route('/upload/csv')
  .post(
    upload.single('csvFile'),
    async (req, res) => {
      try {
        console.log('req.file', req.file);

        // if (req.file?.path) {
        //   let data = fs.createReadStream(
        //     req.file.path,
        //     'utf8'
        //   );
        //   console.log('data', data);
        // }

        const csvFilePath = `${req.file?.path}`;

        // const file = path.resolve(
        //   `${req.file?.path}`
        // );

        console.log('file', csvFilePath);
        // console.log(
        //   'isFile?',
        //   fs.lstatSync(csvFilePath).isFile()
        // );

        const data = await csvToJson().fromFile(
          csvFilePath
        );
        console.log('data', data);

        // repeatlDataSource.manager.query(
        //   `COPY phrase FROM '${file}' DELIMITER ',' CSV HEADER;`
        // );

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

export { router as phraseRouter };
