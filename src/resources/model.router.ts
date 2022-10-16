import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { Model } from '../entity/model.entity';
import { ModelSection } from '../entity/modelSection.entity';

const router = Router();
const modelRepo =
  repeatlDataSource.getRepository(Model);
const modelSectionRepo =
  repeatlDataSource.getRepository(ModelSection);

router.route('/').get(async (_, res) => {
  try {
    const model = await modelRepo.find({
      relations: {
        modelSection: true,
      },
    });
    res.json(model);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:modelSectionId')
  .get(async (req, res) => {
    try {
      const models = await modelRepo.find({
        relations: {
          modelSection: true,
        },
        where: {
          modelSection: {
            id: Number(req.params.modelSectionId),
          },
        },
      });
      res.json(models);
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(error);
    }
  });

router
  .route('/:modelSectionId')
  .post(async (req, res) => {
    try {
      const modelSection =
        await modelSectionRepo.findOneBy({
          id: Number(req.params.modelSectionId),
        });

      const model = modelRepo.create({
        label: req.body.label,
        phraseNative1: req.body.phraseNative1,
        phraseNative2: req.body.phraseNative2,
        phraseNative3: req.body.phraseNative3,
        phraseForeign1: req.body.phraseForeign1,
        phraseForeign2: req.body.phraseForeign2,
        phraseForeign3: req.body.phraseForeign3,
        number: req.body.number,
        modelSection: modelSection!,
      });

      const results = await modelRepo.save(model);
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
      await modelRepo.findOneBy({
        id: Number(req.params.id),
      });
    if (elemToRemove) {
      await modelRepo.remove(elemToRemove);
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

export { router as modelRouter };
