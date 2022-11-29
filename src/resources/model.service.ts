import { repeatlDataSource } from '../../app-data-source';
import { Model } from '../entity/model.entity';
import { ModelSection } from '../entity/modelSection.entity';

export interface IModelData {
  label: string;
  grammarSubject: string;
  number: string;
}

const modelSectionRepo =
  repeatlDataSource.getRepository(ModelSection);
const modelRepo =
  repeatlDataSource.getRepository(Model);

const addModel = async (
  modelSectionId: number,
  modelData: IModelData
) => {
  const modelSection =
    await modelSectionRepo.findOneBy({
      id: modelSectionId,
    });

  const model = modelRepo.create({
    label: modelData.label,
    grammarSubject: modelData.grammarSubject,
    number: modelData.number,
    modelSection: modelSection!,
  });

  const results = await modelRepo.save(model);
  return results;
};

export { addModel };
