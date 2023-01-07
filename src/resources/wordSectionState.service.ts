import { repeatlDataSource } from '../../app-data-source';
import { CollectionState } from '../entity/collectionState.entity';
import { WordSectionState } from '../entity/wordSectionState.entity';

const wordSectionStateRepo =
  repeatlDataSource.getRepository(WordSectionState);
const collectionStateRepo =
  repeatlDataSource.getRepository(CollectionState);

// export interface IWord {
//   native: string;
//   foreign: string;
//   mnemoTag: string;
//   transcription: string;
// }

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
    isCompleted: false,
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

export {
  getWordSectionStateArr,
  getWordSectionState,
  addWordSectionState,
};
