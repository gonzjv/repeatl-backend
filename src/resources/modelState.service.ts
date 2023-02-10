import { repeatlDataSource } from '../../app-data-source';
import { ModelSection } from '../entity/modelSection.entity';
import { ModelState } from '../entity/modelState.entity';

const modelStateRepo =
  repeatlDataSource.getRepository(ModelState);
const modelSectionRepo =
  repeatlDataSource.getRepository(ModelSection);

// interface IWordState {
//   id: number;
//   wordId: number;
//   isCompleted: boolean;
//   isFirstRepeatComplete: boolean;
// }

const getModelStateArr = async () =>
  await modelStateRepo.find({
    // relations: {
    //   wordSectionState: true,
    // },
  });

const addModelState = async (
  modelSectionId: number,
  modelId: number
) => {
  const modelSectionState =
    await modelSectionRepo.findOneBy({
      id: modelSectionId,
    });

  const modelState = modelStateRepo.create({
    modelId: modelId,
    modelSectionState: modelSectionState!,
    isCompleted: false,
  });

  const results = await modelStateRepo.save(modelState);
  return results;
};

const getModelState = async (
  modelSectionStateId: number,
  modelId: number
) =>
  await modelStateRepo.findOne({
    where: {
      modelSectionState: { id: modelSectionStateId },
      modelId: modelId,
    },
  });

const completeModel = async (modelStateId: number) => {
  const elementToUpdate = await modelStateRepo.findOneBy({
    id: modelStateId,
  });

  elementToUpdate!.isCompleted = true;

  const results =
    elementToUpdate &&
    (await modelStateRepo.save(elementToUpdate));
  return results;
};

export {
  addModelState,
  getModelState,
  getModelStateArr,
  completeModel,
};
