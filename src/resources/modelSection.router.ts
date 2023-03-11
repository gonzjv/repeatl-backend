import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { ModelSection } from '../entity/modelSection.entity';
// import { Collection } from '../entity/collection.entity';
import * as modelSectionService from './modelSection.service';

const router = Router();
// const collectionRepo =
//   repeatlDataSource.getRepository(Collection);
const modelSectionRepo =
  repeatlDataSource.getRepository(ModelSection);

router.route('/').get(async (_, res) => {
  try {
    const modelSections = await modelSectionRepo.find({
      relations: {
        collection: true,
        models: true,
      },
    });
    res.json(modelSections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/:collectionId').get(async (req, res) => {
  try {
    const modelSections = await modelSectionRepo.find({
      relations: {
        collection: true,
        models: true,
      },
      where: {
        collection: {
          id: Number(req.params.collectionId),
        },
      },
    });
    res.json(modelSections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/:collectionId').post(async (req, res) => {
  try {
    const sectionData = {
      number: req.body.number,
    };
    const results =
      await modelSectionService.addModelSection(
        Number(req.params.collectionId),
        sectionData
      );
    return res.status(StatusCodes.OK).send(results);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const elemToRemove = await modelSectionRepo.findOneBy({
      id: Number(req.params.id),
    });
    if (elemToRemove) {
      await modelSectionRepo.remove(elemToRemove);
      return res.status(StatusCodes.OK).send(elemToRemove);
    }
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send('modelSection is not exist');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
});

router.route('/completed/:userId').get(async (req, res) => {
  try {
    console.log('FLAG!!!!');
    const modelSections =
      await modelSectionService.getCompletedModelSectionArr(
        Number(req.params.userId)
      );
    console.log('completed sections', modelSections);
    res.json(modelSections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

export { router as modelSectionRouter };
