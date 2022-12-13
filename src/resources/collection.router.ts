import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Collection } from '../entity/collection.entity';
import * as collectionService from './collection.service';

const router = Router();
const collectionRepo =
  repeatlDataSource.getRepository(Collection);

router.route('/').get(async (_, res) => {
  try {
    const collections = await collectionRepo.find({
      relations: {
        course: true,
        modelSections: {
          models: {
            phrases: true,
          },
        },
      },
    });
    res.json(collections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/:courseId').get(async (req, res) => {
  try {
    const collections = await collectionRepo.find({
      relations: {
        course: true,
        modelSections: {
          models: { phrases: true },
        },
        wordSections: {
          words: true,
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
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/id/:collectionId').get(async (req, res) => {
  try {
    const collection = await collectionRepo.findOne({
      where: {
        id: Number(req.params.collectionId),
      },
      relations: {
        wordSections: true,
      },
    });
    res.json(collection);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/:courseId').post(async (req, res) => {
  try {
    const results = await collectionService.addCollection(
      req.params.courseId,
      req.body.number
    );
    return res.status(StatusCodes.OK).send(results);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
});

router.route('/:collectionID').delete(async (req, res) => {
  try {
    const collectionToRemove =
      await collectionRepo.findOneBy({
        id: Number(req.params.collectionID),
      });
    if (collectionToRemove) {
      await collectionRepo.remove(collectionToRemove);
      return res
        .status(StatusCodes.OK)
        .send(collectionToRemove);
    }
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send('collection is not exist');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
});

export { router as collectionRouter };
