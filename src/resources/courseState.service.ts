import { repeatlDataSource } from '../../app-data-source';
import { CourseState } from '../entity/courseState.entity';
import { Progress } from '../entity/progress.entity';

const courseStateRepo =
  repeatlDataSource.getRepository(CourseState);
const progressRepo =
  repeatlDataSource.getRepository(Progress);

// export interface IWord {
//   native: string;
//   foreign: string;
//   mnemoTag: string;
//   transcription: string;
// }

const getCourseStateArr = async () =>
  await courseStateRepo.find({
    relations: {
      collectionStateArr: true,
    },
  });

const addCourseState = async (
  progressId: number,
  courseId: number
) => {
  const progress = await progressRepo.findOneBy({
    id: progressId,
  });

  const courseState = courseStateRepo.create({
    courseId: courseId,
    progress: progress!,
    inLearning: true,
    isCompleted: false,
  });

  const results = await courseStateRepo.save(courseState);
  return results;
};

const getCourseState = async (
  progressId: number,
  courseId: number
) =>
  await courseStateRepo.findOne({
    relations: { collectionStateArr: true },
    where: {
      progress: { id: progressId },
      courseId: courseId,
    },
  });

export {
  getCourseStateArr,
  addCourseState,
  getCourseState,
};
