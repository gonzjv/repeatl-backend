import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Collection } from '../entity/collection.entity';

const router = Router();

router.route('/').get(async (req, res) => {
  try {
    console.log(req);
    const collections = await repeatlDataSource
      .getRepository(Collection)
      .find();
    res.json(collections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/').post(async (req, res) => {
  try {
    console.log('req.body is', req.body);
    const collection = await repeatlDataSource
      .getRepository(Collection)
      .create(req.body);
    const results = await repeatlDataSource
      .getRepository(Collection)
      .save(collection);
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
