import { repeatlDataSource } from '../../app-data-source';
import { Progress } from '../entity/progress.entity';
import { User } from '../entity/user.entity';

const progressRepo =
  repeatlDataSource.getRepository(Progress);
const userRepo = repeatlDataSource.getRepository(User);

// export interface IWord {
//   native: string;
//   foreign: string;
//   mnemoTag: string;
//   transcription: string;
// }

const getProgressArr = async () =>
  await progressRepo.find({
    relations: {
      courseStateArr: true,
    },
  });

const addProgress = async (userId: number) => {
  const user = await userRepo.findOneBy({
    id: userId,
  });

  const progress = progressRepo.create({
    user: user!,
  });

  const results = await progressRepo.save(progress);
  return results;
};

// const getWord = async (
//   native: string,
//   wordSectionId: number
// ) =>
//   await wordRepo.findOne({
//     relations: { wordSection: true },
//     where: {
//       native: native,
//       wordSection: { id: wordSectionId },
//     },
//   });

// const getWordArr = async (wordSectionId: number) =>
//   await wordRepo.find({
//     relations: {
//       wordSection: true,
//     },
//     where: {
//       wordSection: {
//         id: Number(wordSectionId),
//       },
//     },
//   });

export { getProgressArr, addProgress };
