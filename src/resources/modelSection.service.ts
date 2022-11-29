import { repeatlDataSource } from '../../app-data-source';
import { Collection } from '../entity/collection.entity';
import { ModelSection } from '../entity/modelSection.entity';

const collectionRepo =
  repeatlDataSource.getRepository(Collection);
const modelSectionRepo =
  repeatlDataSource.getRepository(ModelSection);

const addModelSection = async (
  collectionId: string,
  sectionData: { number: string }
) => {
  const collection =
    await collectionRepo.findOneBy({
      id: Number(collectionId),
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

export { addModelSection };
