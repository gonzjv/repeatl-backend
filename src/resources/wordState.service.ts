import { repeatlDataSource } from '../../app-data-source';
import { WordSectionState } from '../entity/wordSectionState.entity';
import { WordState } from '../entity/wordState.entity';

const wordStateRepo =
  repeatlDataSource.getRepository(WordState);
const wordSectionRepo = repeatlDataSource.getRepository(
  WordSectionState
);

interface IWordState {
  id: number;
  wordId: number;
  isCompleted: boolean;
  isFirstRepeatComplete: boolean;
}

const getWordStateArr = async () =>
  await wordStateRepo.find({
    // relations: {
    //   wordSectionState: true,
    // },
  });

const addWordState = async (
  wordSectionId: number,
  wordId: number
) => {
  const wordSectionState = await wordSectionRepo.findOneBy({
    id: wordSectionId,
  });

  const wordState = wordStateRepo.create({
    wordId: wordId,
    wordSectionState: wordSectionState!,
    isCompleted: false,
    isFirstRepeatComplete: false,
  });

  const results = await wordStateRepo.save(wordState);
  return results;
};

const getWordState = async (
  wordSectionStateId: number,
  wordId: number
) =>
  await wordStateRepo.findOne({
    // relations: { wordSectionState: true },
    where: {
      wordSectionState: { id: wordSectionStateId },
      wordId: wordId,
    },
  });

const completeWord = async (wordStateId: number) => {
  const elementToUpdate = await wordStateRepo.findOneBy({
    id: wordStateId,
  });

  elementToUpdate!.isCompleted = true;

  const results =
    elementToUpdate &&
    (await wordStateRepo.save(elementToUpdate));
  return results;
};

const completeFirstRepeatBatch = async (
  wordStateIdArr: number[]
) => {
  let results: IWordState[] = [];
  wordStateIdArr.map(async (wordStateId) => {
    const elementToUpdate = await wordStateRepo.findOneBy({
      id: wordStateId,
    });

    elementToUpdate!.isFirstRepeatComplete = true;

    elementToUpdate &&
      results.push(
        await wordStateRepo.save(elementToUpdate)
      );
  });
  return results;
};

export {
  addWordState,
  getWordState,
  getWordStateArr,
  completeWord,
  completeFirstRepeatBatch,
};
