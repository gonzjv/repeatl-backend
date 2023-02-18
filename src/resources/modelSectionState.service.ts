import { repeatlDataSource } from '../../app-data-source';
import { CollectionState } from '../entity/collectionState.entity';
import { ModelSectionState } from '../entity/modelSectionState.entity';

const modelSectionStateRepo =
  repeatlDataSource.getRepository(ModelSectionState);
const collectionStateRepo =
  repeatlDataSource.getRepository(CollectionState);

interface IModelSectionState {
  id: number;
  isCompleted: boolean;
}

const getModelSectionStateArr = async () =>
  await modelSectionStateRepo.find({
    relations: {
      modelStateArr: true,
    },
  });

const addModelSecionState = async (
  collectionStateId: number,
  modelSectionId: number
) => {
  const collectionState =
    await collectionStateRepo.findOneBy({
      id: collectionStateId,
    });

  const modelSectionState = modelSectionStateRepo.create({
    modelSectionId: modelSectionId,
    collectionState: collectionState!,
    inLearning: true,
    isCompleted: false,
  });

  const results = await modelSectionStateRepo.save(
    modelSectionState
  );
  return results;
};

const getModelSectionState = async (
  collectionStateId: number,
  modelSectionId: number
) =>
  await modelSectionStateRepo.findOne({
    relations: { modelStateArr: true },
    where: {
      collectionState: { id: collectionStateId },
      modelSectionId: modelSectionId,
    },
  });

const updateModelSectionState = async (
  modelSectionState: IModelSectionState
) => {
  const elementToUpdate =
    await modelSectionStateRepo.findOneBy({
      id: modelSectionState.id,
    });

  elementToUpdate!.isCompleted =
    modelSectionState.isCompleted;

  const results =
    elementToUpdate &&
    (await modelSectionStateRepo.save(elementToUpdate));
  return results;
};

export {
  addModelSecionState,
  getModelSectionState,
  getModelSectionStateArr,
  updateModelSectionState,
};
