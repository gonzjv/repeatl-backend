import { repeatlDataSource } from '../../app-data-source';
import { Collection } from '../entity/collection.entity';
import { ModelSection } from '../entity/modelSection.entity';
import { ModelSectionState } from '../entity/modelSectionState.entity';

const collectionRepo =
  repeatlDataSource.getRepository(Collection);
const modelSectionRepo =
  repeatlDataSource.getRepository(ModelSection);
const modelSectionStateRepo =
  repeatlDataSource.getRepository(ModelSectionState);

const addModelSection = async (
  collectionId: number,
  sectionData: { number: string }
) => {
  const collection = await collectionRepo.findOneBy({
    id: collectionId,
  });

  const modelSection = modelSectionRepo.create({
    number: sectionData.number,
    collection: collection!,
  });

  const results = await modelSectionRepo.save(modelSection);
  return results;
};

const getModelSection = async (
  modelSectionNumber: string,
  collectionId: number
) =>
  await modelSectionRepo.findOne({
    relations: { collection: true },
    where: {
      number: modelSectionNumber,
      collection: { id: collectionId },
    },
  });

const getCompletedModelSectionArr = async (
  userId: number
) => {
  let completedSectionArr = [];
  // let toRepeatStateArr = [];
  const completedStateArr =
    await modelSectionStateRepo.find({
      where: {
        collectionState: {
          courseState: {
            progress: { user: { id: userId } },
          },
        },
        isCompleted: true,
      },
    });

  // const currentDate = Date();
  // console.log('currentTime', currentDate);
  const currentDate = new Date().toLocaleDateString();
  // console.log('currentTimeNew', currentTimeNew);
  // const dateNow = Date.now();
  // console.log('dateNow', dateNow);

  for (const state of completedStateArr) {
    const completeDate =
      state.updatedDate.toLocaleDateString();
    console.log('currentDate', currentDate);
    console.log('completeDate', completeDate);
    if (currentDate === completeDate) {
      const completedSection =
        await modelSectionRepo.findOne({
          where: { id: state.modelSectionId },
          relations: { models: { phrases: true } },
        });
      completedSectionArr.push(completedSection);
    }
  }
  return completedSectionArr;
  // return completedStateArr;
};

export {
  addModelSection,
  getModelSection,
  getCompletedModelSectionArr,
};
