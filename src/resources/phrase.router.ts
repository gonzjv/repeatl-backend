import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
// import { Model } from '../entity/model.entity';
import { Phrase } from '../entity/phrase.entity';
import { addPhrase } from './phrase.service';

const router = Router();
// const modelRepo = repeatlDataSource.getRepository(Model);
const phraseRepo = repeatlDataSource.getRepository(Phrase);

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

router.route('/:modelId').get(async (req, res) => {
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
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/:modelId').post(async (req, res) => {
  try {
    // const model = await modelRepo.findOneBy({
    //   id: Number(req.params.modelId),
    // });

    // const phrase = phraseRepo.create({
    //   label: req.body.label,
    //   native: req.body.native,
    //   foreign: req.body.foreign,
    //   model: model!,
    // });

    // const results = await phraseRepo.save(phrase);
    const phraseData = {
      label: req.body.label,
      native: req.body.native,
      foreign: req.body.foreign,
    };
    const results = await addPhrase(
      Number(req.params.modelId),
      phraseData
    );
    return res.status(StatusCodes.OK).send(results);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const elemToRemove = await phraseRepo.findOneBy({
      id: Number(req.params.id),
    });
    if (elemToRemove) {
      await phraseRepo.remove(elemToRemove);
      return res.status(StatusCodes.OK).send(elemToRemove);
    }
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .send('element is not exist');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
});

export { router as phraseRouter };
