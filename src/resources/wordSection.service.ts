import { repeatlDataSource } from '../../app-data-source';
import { checkSection } from '../common/helpers';
import { Collection } from '../entity/collection.entity';
import { WordSection } from '../entity/wordSection.entity';
import { WordSectionState } from '../entity/wordSectionState.entity';

const collectionRepo =
  repeatlDataSource.getRepository(Collection);
const wordSectionRepo =
  repeatlDataSource.getRepository(WordSection);
const wordSectionStateRepo =
  repeatlDataSource.getRepository(WordSectionState);

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

const getCompletedWordSectionArr = async (
  userId: number
) => {
  let completedSectionArr: WordSection[] = [];
  const completedStateArr = await wordSectionStateRepo.find(
    {
      where: {
        collectionState: {
          courseState: {
            progress: { user: { id: userId } },
          },
        },
        isCompleted: true,
      },
    }
  );

  const addSectionToArr = async (
    state: WordSectionState
  ) => {
    const completedSection = await wordSectionRepo.findOne({
      where: { id: state.wordSectionId },
      relations: { words: true },
    });
    completedSectionArr.push(completedSection!);
    // console.log('completedSection: ', completedSection);
  };

  for (const state of completedStateArr) {
    const isRepeatNeeded = checkSection(state) && true;
    isRepeatNeeded && (await addSectionToArr(state));
  }
  return completedSectionArr;
};
export {
  addWordSection,
  getWordSection,
  getWordSectionArr,
  getCompletedWordSectionArr,
};
