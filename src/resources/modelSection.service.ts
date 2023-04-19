import { repeatlDataSource } from '../../app-data-source';
import { checkSection } from '../common/helpers';
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
  let completedSectionArr: ModelSection[] = [];
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

  const addSectionToArr = async (
    state: ModelSectionState
  ) => {
    const completedSection = await modelSectionRepo.findOne(
      {
        where: { id: state.modelSectionId },
        relations: { models: { phrases: true } },
      }
    );
    completedSectionArr.push(completedSection!);
  };

  for (const state of completedStateArr) {
    const isRepeatNeeded = checkSection(state) && true;
    isRepeatNeeded && (await addSectionToArr(state));
  }
  return completedSectionArr;
};

export {
  addModelSection,
  getModelSection,
  getCompletedModelSectionArr,
};
