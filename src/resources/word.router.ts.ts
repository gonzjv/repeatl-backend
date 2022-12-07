import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addWord, getWordArr } from './word.service';

const router = Router();

// router.route('/').get(async (_, res) => {
//   try {
//     const phrase = await wordRepo.find({
//       relations: {
//         wordSection: true,
//       },
//     });
//     res.json(phrase);
//   } catch (error) {
//     res.status(StatusCodes.NOT_FOUND).send(error);
//   }
// });

router.route('/:wordSectionId').get(async (req, res) => {
  try {
    const wordArr = await getWordArr(
      Number(req.params.wordSectionId)
    );
    res.json(wordArr);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router.route('/:wordSectionId').post(async (req, res) => {
  try {
    const wordData = {
      label: req.body.label,
      native: req.body.native,
      foreign: req.body.foreign,
    };
    const results = await addWord(
      Number(req.params.wordSectionId),
      wordData
    );
    return res.status(StatusCodes.OK).send(results);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
  }
});

// router.route('/:id').delete(async (req, res) => {
//   try {
//     const elemToRemove = await wordRepo.findOneBy({
//       id: Number(req.params.id),
//     });
//     if (elemToRemove) {
//       await wordRepo.remove(elemToRemove);
//       return res.status(StatusCodes.OK).send(elemToRemove);
//     }
//     return res
//       .status(StatusCodes.NOT_ACCEPTABLE)
//       .send('element is not exist');
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST).send(error);
//   }
// });

export { router as phraseRouter };
