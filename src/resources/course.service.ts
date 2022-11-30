import csvToJson from 'csvtojson';
import * as fs from 'node:fs';
import * as collectionService from './collection.service';
import {
  addModel,
  getModel,
  IModelData,
} from './model.service';
import * as modelSectionService from './modelSection.service';
import {
  addPhrase,
  getPhrase,
  IPhrase,
} from './phrase.service';

interface ICsvRow {
  modelNumber: string;
  label: string;
  grammarSubject: string;
  phraseNL1: string;
  phraseFL1: string;
  phraseNL2: string;
  phraseFL2: string;
  phraseNL3: string;
  phraseFL3: string;
}

const addDataFromCsv = async (
  csvFilePath: string,
  courseId: string
) => {
  const csvRowArr = await csvToJson().fromFile(csvFilePath);
  console.log('data', csvRowArr);

  for (const csvRow of csvRowArr) {
    await addCollectionFromCsv(csvRow, courseId);
  }
};

const addCollectionFromCsv = async (
  csvRow: ICsvRow,
  courseId: string
) => {
  const separator = '/';

  const labelPartArr = csvRow.label.split(separator);

  const collectionNumber: string = labelPartArr[0];

  const collection = await collectionService.getCollection(
    collectionNumber,
    courseId
  );

  const isCollectionExist =
    collection !== null ? true : false;

  if (isCollectionExist) {
    console.log('collection already exist');
    await addModelSectionFromCsv(collection!.id, csvRow);
  } else {
    const newCollection =
      await collectionService.addCollection(
        courseId,
        collectionNumber
      );
    console.log('newCollection', newCollection);

    await addModelSectionFromCsv(newCollection.id, csvRow);
  }
};

const addModelSectionFromCsv = async (
  collectionId: number,
  csvRow: ICsvRow
) => {
  const separator = '/';
  const labelPartArr = csvRow.label.split(separator);
  const modelSectionNumber = labelPartArr[1];

  const modelSection =
    await modelSectionService.getModelSection(
      modelSectionNumber,
      collectionId
    );
  const isModelSectionExist =
    modelSection !== null ? true : false;

  if (isModelSectionExist) {
    console.log('section already exist');
    await addModelFromCsv(modelSection!.id, csvRow);
  } else {
    const sectionData = {
      number: modelSectionNumber,
    };
    const newModelSection =
      await modelSectionService.addModelSection(
        collectionId,
        sectionData
      );
    console.log('newModelSection', newModelSection);
    await addModelFromCsv(newModelSection.id, csvRow);
  }
};

const addModelFromCsv = async (
  modelSectionId: number,
  csvRow: ICsvRow
) => {
  const modelData: IModelData = {
    label: csvRow.label,
    grammarSubject: csvRow.grammarSubject,
    number: csvRow.modelNumber,
  };

  const model = await getModel(
    modelData.number,
    modelSectionId
  );
  const isModelExists = model !== null ? true : false;
  if (isModelExists) {
    console.log('model alreday exists');
    await addPhraseListFromCsv(model!.id, csvRow);
  } else {
    const newModel = await addModel(
      modelSectionId,
      modelData
    );
    console.log('newModel', newModel);
    await addPhraseListFromCsv(newModel.id, csvRow);
  }
};

const addPhraseListFromCsv = async (
  modelId: number,
  csvRow: ICsvRow
) => {
  const {
    phraseFL1,
    phraseFL2,
    phraseFL3,
    phraseNL1,
    phraseNL2,
    phraseNL3,
  } = csvRow;
  const phraseArr: IPhrase[] = [
    { native: phraseNL1, foreign: phraseFL1 },
    { native: phraseNL2, foreign: phraseFL2 },
    { native: phraseNL3, foreign: phraseFL3 },
  ];

  for (const phrase of phraseArr) {
    const phraseFromDb = await getPhrase(
      phrase.native,
      modelId
    );
    const isPhraseExist =
      phraseFromDb !== null ? true : false;
    if (isPhraseExist) {
      console.log('phrase is already exist');
    } else {
      const newPhrase = await addPhrase(modelId, phrase);
      console.log('newPhrase', newPhrase);
    }
  }
};

const deleteFile = async (csvFilePath: string) => {
  fs.unlink(csvFilePath, (err) => {
    if (err && err.code == 'ENOENT') {
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      console.error(
        'Error occurred while trying to remove file'
      );
    } else {
      console.info(`temp file is removed`);
    }
  });
};

export { addDataFromCsv, deleteFile };
