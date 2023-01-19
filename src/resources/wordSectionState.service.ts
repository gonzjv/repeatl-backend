import { repeatlDataSource } from '../../app-data-source';
import { CollectionState } from '../entity/collectionState.entity';
import { WordSectionState } from '../entity/wordSectionState.entity';

const wordSectionStateRepo =
  repeatlDataSource.getRepository(WordSectionState);
const collectionStateRepo =
  repeatlDataSource.getRepository(CollectionState);

interface IWordSectionState {
  id: number;
  isCompleted: boolean;
  isIntroActive: boolean;
  isFirstRepeatActive: boolean;
  isSecondRepeatActive: boolean;
}

const getWordSectionStateArr = async () =>
  await wordSectionStateRepo.find({
    relations: {
      wordStateArr: true,
    },
  });

const addWordSectionState = async (
  collectionStateId: number,
  wordSectionId: number
) => {
  const collectionState =
    await collectionStateRepo.findOneBy({
      id: collectionStateId,
    });

  const wordSectionState = wordSectionStateRepo.create({
    wordSectionId: wordSectionId,
    collectionState: collectionState!,
    inLearning: true,
    isIntroActive: true,
    isCompleted: false,
    isFirstRepeatActive: false,
    isSecondRepeatActive: false,
  });

  const results = await wordSectionStateRepo.save(
    wordSectionState
  );
  return results;
};

const getWordSectionState = async (
  collectionStateId: number,
  wordSectionId: number
) =>
  await wordSectionStateRepo.findOne({
    relations: { wordStateArr: true },
    where: {
      collectionState: { id: collectionStateId },
      wordSectionId: wordSectionId,
    },
  });

const updateWordSectionState = async (
  wordSectionState: IWordSectionState
) => {
  const elementToUpdate =
    await wordSectionStateRepo.findOneBy({
      id: wordSectionState.id,
    });

  elementToUpdate!.isCompleted =
    wordSectionState.isCompleted;
  elementToUpdate!.isIntroActive =
    wordSectionState.isIntroActive;
  elementToUpdate!.isFirstRepeatActive =
    wordSectionState.isFirstRepeatActive;
  elementToUpdate!.isSecondRepeatActive =
    wordSectionState.isSecondRepeatActive;

  const results =
    elementToUpdate &&
    (await wordSectionStateRepo.save(elementToUpdate));
  return results;
};

export {
  getWordSectionStateArr,
  getWordSectionState,
  addWordSectionState,
  updateWordSectionState,
};
