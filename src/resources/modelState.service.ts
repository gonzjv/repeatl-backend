import { repeatlDataSource } from '../../app-data-source';
import { ModelSection } from '../entity/modelSection.entity';
import { ModelSectionState } from '../entity/modelSectionState.entity';
import { ModelState } from '../entity/modelState.entity';

const modelStateRepo =
  repeatlDataSource.getRepository(ModelState);
const modelSectionStateRepo =
  repeatlDataSource.getRepository(ModelSectionState);
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
  modelSectionStateId: number,
  modelId: number
) => {
  const modelSectionState =
    await modelSectionStateRepo.findOneBy({
      id: modelSectionStateId,
    });

  const modelState = modelStateRepo.create({
    modelId: modelId,
    modelSectionState: modelSectionState!,
    isCompleted: false,
  });

  const results = await modelStateRepo.save(modelState);
  return results;
};

const addModelStateArr = async (
  modelSectionStateId: number
) => {
  const modelSectionState =
    await modelSectionStateRepo.findOneBy({
      id: modelSectionStateId,
    });

  const modelSection = await modelSectionRepo.findOneBy({
    id: modelSectionState?.modelSectionId,
  });

  let modelStateArr = [];

  for (const model of modelSection!.models) {
    const newModelState = modelStateRepo.create({
      modelId: model.id,
      modelSectionState: modelSectionState!,
      isCompleted: false,
    });

    const result = await modelStateRepo.save(newModelState);
    modelStateArr.push(result);
  }

  return modelStateArr;
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
  addModelStateArr,
  getModelState,
  getModelStateArr,
  completeModel,
};
