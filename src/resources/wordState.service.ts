import { repeatlDataSource } from '../../app-data-source';
import { WordSectionState } from '../entity/wordSectionState.entity';
import { WordState } from '../entity/wordState.entity';

const wordStateRepo =
  repeatlDataSource.getRepository(WordState);
const wordSectionRepo = repeatlDataSource.getRepository(
  WordSectionState
);

// export interface IWord {
//   native: string;
//   foreign: string;
//   mnemoTag: string;
//   transcription: string;
// }

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

export { addWordState, getWordState, getWordStateArr };
