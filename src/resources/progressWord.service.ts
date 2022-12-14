import { repeatlDataSource } from '../../app-data-source';
import { ProgressWord } from '../entity/progressWord.entity';
import { User } from '../entity/user.entity';

const progressWordRepo =
  repeatlDataSource.getRepository(ProgressWord);
const userRepo = repeatlDataSource.getRepository(User);

export interface IProgressData {
  userId: string;
  wordStep: string;
  sectionStep: string;
  collectionId: string;
}

const addProgressWord = async (
  progressData: IProgressData
) => {
  const { collectionId, sectionStep, userId, wordStep } =
    progressData;

  const user = await userRepo.findOneBy({
    id: Number(userId),
  });

  const progress = progressWordRepo.create({
    wordStep: Number(wordStep),
    sectionStep: Number(sectionStep),
    collectionId: Number(collectionId),
    user: user!,
  });

  return progress;
};

// const addPhrase = async (
//   modelId: number,
//   phraseData: IPhrase
// ) => {
//   const model = await modelRepo.findOneBy({
//     id: modelId,
//   });

//   const phrase = phraseRepo.create({
//     native: phraseData.native,
//     foreign: phraseData.foreign,
//     model: model!,
//   });

//   const results = await phraseRepo.save(phrase);
//   return results;
// };

const getProgressWord = async (
  collectionId: string,
  userId: string
) => {
  const progressArr = await progressWordRepo.find({
    where: {
      user: {
        id: Number(userId),
      },
    },
  });

  const progress = progressArr.find(
    (e) => e.collectionId == Number(collectionId)
  );

  return progress;
};

export { getProgressWord, addProgressWord };
