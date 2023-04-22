import { repeatlDataSource } from '../../app-data-source';
import { CollectionState } from '../entity/collectionState.entity';
import { WordSectionState } from '../entity/wordSectionState.entity';

const wordSectionStateRepo =
  repeatlDataSource.getRepository(WordSectionState);
const collectionStateRepo =
  repeatlDataSource.getRepository(CollectionState);

interface IWordSectionState {
  id: number;
  isCompleted: boolean;
  isIntroActive: boolean;
  isFirstRepeatActive: boolean;
  isSecondRepeatActive: boolean;
}

const getWordSectionStateArr = async () =>
  await wordSectionStateRepo.find({
    relations: {
      wordStateArr: true,
    },
  });

const addWordSectionState = async (
  collectionStateId: number,
  wordSectionId: number
) => {
  const collectionState =
    await collectionStateRepo.findOneBy({
      id: collectionStateId,
    });

  const wordSectionState = wordSectionStateRepo.create({
    wordSectionId: wordSectionId,
    collectionState: collectionState!,
    inLearning: true,
    isIntroActive: true,
    isCompleted: false,
    isFirstRepeatActive: false,
    isSecondRepeatActive: false,
    sameDayRepeatDone: false,
    weeklyFirstRepeatDone: false,
    weeklySecondRepeatDone: false,
    weekly3done: false,
    weekly4Done: false,
    weekly5Done: false,
    weekly6Done: false,
    secondWeekDone: false,
    secondWeekAndDayDone: false,
    fourthWeekDone: false,
    fourthWeekAndDayDone: false,
    secondMonthDone: false,
    secondMonthAndDayDone: false,
    fourthMonthDone: false,
    fourthMonthAndDayDone: false,
    tenthMonthDone: false,
    tenthMonthAndDayDone: false,
  });

  const results = await wordSectionStateRepo.save(
    wordSectionState
  );
  return results;
};

const getWordSectionState = async (
  collectionStateId: number,
  wordSectionId: number
) =>
  await wordSectionStateRepo.findOne({
    relations: { wordStateArr: true },
    where: {
      collectionState: { id: collectionStateId },
      wordSectionId: wordSectionId,
    },
  });

const updateWordSectionState = async (
  wordSectionState: IWordSectionState
) => {
  const elementToUpdate =
    await wordSectionStateRepo.findOneBy({
      id: wordSectionState.id,
    });

  elementToUpdate!.isCompleted =
    wordSectionState.isCompleted;
  elementToUpdate!.isIntroActive =
    wordSectionState.isIntroActive;
  elementToUpdate!.isFirstRepeatActive =
    wordSectionState.isFirstRepeatActive;
  elementToUpdate!.isSecondRepeatActive =
    wordSectionState.isSecondRepeatActive;

  const results =
    elementToUpdate &&
    (await wordSectionStateRepo.save(elementToUpdate));
  return results;
};

const completeWordRepeat = async (
  collectionStateId: number,
  sectionId: number
) => {
  const elementToUpdate = await getWordSectionState(
    collectionStateId,
    sectionId
  );
  const saveElement = async (el: IWordSectionState) =>
    await wordSectionStateRepo.save(el!);

  console.log('elementToUpdate', elementToUpdate);
  if (!elementToUpdate?.sameDayRepeatDone) {
    elementToUpdate!.sameDayRepeatDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.weeklyFirstRepeatDone) {
    elementToUpdate.weeklyFirstRepeatDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.weeklySecondRepeatDone) {
    elementToUpdate.weeklySecondRepeatDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.weekly3done) {
    elementToUpdate.weekly3done = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.weekly4Done) {
    elementToUpdate.weekly4Done = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.weekly5Done) {
    elementToUpdate.weekly5Done = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.weekly6Done) {
    elementToUpdate.weekly6Done = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.secondWeekDone) {
    elementToUpdate.secondWeekDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.secondWeekAndDayDone) {
    elementToUpdate.secondWeekAndDayDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.fourthWeekDone) {
    elementToUpdate.fourthWeekDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.fourthWeekAndDayDone) {
    elementToUpdate.fourthWeekAndDayDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.secondMonthDone) {
    elementToUpdate.secondMonthDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.secondMonthAndDayDone) {
    elementToUpdate.secondMonthAndDayDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.fourthMonthDone) {
    elementToUpdate.fourthMonthDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.fourthMonthAndDayDone) {
    elementToUpdate.fourthMonthAndDayDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.tenthMonthDone) {
    elementToUpdate.tenthMonthDone = true;
    return saveElement(elementToUpdate!);
  } else if (!elementToUpdate.tenthMonthAndDayDone) {
    elementToUpdate.tenthMonthAndDayDone = true;
    return saveElement(elementToUpdate!);
  }
};

export {
  getWordSectionStateArr,
  getWordSectionState,
  addWordSectionState,
  updateWordSectionState,
  completeWordRepeat,
};
