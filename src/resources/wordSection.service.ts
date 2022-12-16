import { repeatlDataSource } from '../../app-data-source';
import { Collection } from '../entity/collection.entity';
import { WordSection } from '../entity/wordSection.entity';

const collectionRepo =
  repeatlDataSource.getRepository(Collection);
const wordSectionRepo =
  repeatlDataSource.getRepository(WordSection);

const addWordSection = async (
  collectionId: number,
  sectionData: { number: string }
) => {
  const collection = await collectionRepo.findOneBy({
    id: collectionId,
  });

  const wordSection = wordSectionRepo.create({
    number: sectionData.number,
    collection: collection!,
  });

  const results = await wordSectionRepo.save(wordSection);
  return results;
};

const getWordSection = async (
  wordSectionNumber: string,
  collectionId: number
) =>
  await wordSectionRepo.findOne({
    relations: { collection: true },
    where: {
      number: wordSectionNumber,
      collection: { id: collectionId },
    },
  });

const getWordSectionArr = async (collectionId: string) =>
  await wordSectionRepo.find({
    relations: {
      collection: true,
      words: true,
    },
    where: {
      collection: {
        id: Number(collectionId),
      },
    },
  });

export {
  addWordSection,
  getWordSection,
  getWordSectionArr,
};
