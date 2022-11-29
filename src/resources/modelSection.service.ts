import { repeatlDataSource } from '../../app-data-source';
import { Collection } from '../entity/collection.entity';
import { ModelSection } from '../entity/modelSection.entity';

const collectionRepo =
  repeatlDataSource.getRepository(Collection);
const modelSectionRepo =
  repeatlDataSource.getRepository(ModelSection);

const addModelSection = async (
  collectionId: number,
  sectionData: { number: string }
) => {
  const collection =
    await collectionRepo.findOneBy({
      id: collectionId,
    });

  const modelSection = modelSectionRepo.create({
    number: sectionData.number,
    collection: collection!,
  });

  const results = await modelSectionRepo.save(
    modelSection
  );
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

export { addModelSection, getModelSection };
