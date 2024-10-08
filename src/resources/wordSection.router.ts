import { Router } from 'express';
import { repeatlDataSource } from '../../app-data-source';
import { StatusCodes } from 'http-status-codes';
import { WordSection } from '../entity/wordSection.entity';
import {
  addWordSection,
  getCompletedWordSectionArr,
  getWordSectionArr,
} from './wordSection.service';

const router = Router();
const wordSectionRepo =
  repeatlDataSource.getRepository(WordSection);

// router.route('/').get(async (_, res) => {
//   try {
//     const modelSections =
//       await wordSectionRepo.find({
//         relations: {
//           collection: true,
//           words: true,
//         },
//       });
//     res.json(modelSections);
//   } catch (error) {
//     res.status(StatusCodes.NOT_FOUND).send(error);
//   }
// });

router.route('/:collectionId').get(async (req, res) => {
  try {
    const wordSections = await getWordSectionArr(
      req.params.collectionId
    );

    res.json(wordSections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/:collectionId').post(async (req, res) => {
  try {
    const sectionData = {
      number: req.body.number,
    };
    const results = await addWordSection(
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
    const elemToRemove = await wordSectionRepo.findOneBy({
      id: Number(req.params.id),
    });
    if (elemToRemove) {
      await wordSectionRepo.remove(elemToRemove);
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
    const modelSections = await getCompletedWordSectionArr(
      Number(req.params.userId)
    );
    console.log('completed sections', modelSections);
    res.json(modelSections);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

export { router as wordSectionRouter };
