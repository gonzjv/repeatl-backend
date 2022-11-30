import { repeatlDataSource } from '../../app-data-source';
import { Collection } from '../entity/collection.entity';
import { Course } from '../entity/course.entity';

const courseRepo =
  repeatlDataSource.getRepository(Course);
const collectionRepo =
  repeatlDataSource.getRepository(Collection);

const addCollection = async (
  courseId: string,
  collectionNumber: string
) => {
  const course = await courseRepo.findOneBy({
    id: Number(courseId),
  });

  const collection = collectionRepo.create({
    number: collectionNumber,
    course: course!,
  });

  const results = await collectionRepo.save(
    collection
  );
  return results;
};

const getCollection = async (
  collectionNumber: string,
  courseId: string
) =>
  await collectionRepo.findOne({
    relations: { course: true },
    where: {
      number: collectionNumber,
      course: { id: Number(courseId) },
    },
  });

export { addCollection, getCollection };
