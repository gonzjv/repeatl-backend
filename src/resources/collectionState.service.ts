import { repeatlDataSource } from '../../app-data-source';
import { CollectionState } from '../entity/collectionState.entity';
import { CourseState } from '../entity/courseState.entity';

const collectionStateRepo =
  repeatlDataSource.getRepository(CollectionState);
const courseStateRepo =
  repeatlDataSource.getRepository(CourseState);

// export interface IWord {
//   native: string;
//   foreign: string;
//   mnemoTag: string;
//   transcription: string;
// }

const getCollectionsStateArr = async () =>
  await collectionStateRepo.find({
    relations: {
      wordSectionStateArr: true,
    },
  });

const addCollectionState = async (
  courseStateId: number,
  collectionId: number
) => {
  const courseState = await courseStateRepo.findOneBy({
    id: courseStateId,
  });

  const collectionState = collectionStateRepo.create({
    collectionId: collectionId,
    courseState: courseState!,
    inLearning: true,
    isCompleted: false,
  });

  const results = await collectionStateRepo.save(
    collectionState
  );
  return results;
};

const getCollectionState = async (
  courseStateId: number,
  collectionId: number
) =>
  await collectionStateRepo.findOne({
    relations: {
      wordSectionStateArr: true,
      modelSectionStateArr: true,
    },
    where: {
      courseState: { id: courseStateId },
      collectionId: collectionId,
    },
  });

export {
  addCollectionState,
  getCollectionState,
  getCollectionsStateArr,
};
