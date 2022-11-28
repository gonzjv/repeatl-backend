import csvToJson from 'csvtojson';
import * as fs from 'node:fs';
import * as collectionService from './collection.service';

const addDataFromCsv = async (
  csvFilePath: string,
  courseId: string
) => {
  const csvRowArr = await csvToJson().fromFile(
    csvFilePath
  );
  console.log('data', csvRowArr);
  const separator = '/';

  for (const elem of csvRowArr) {
    const labelPartArr =
      elem.label.split(separator);

    const collectionNumber: string =
      labelPartArr[0];

    // const modelSectionNumber = labelPartArr[1]

    const collection =
      await collectionService.getCollection(
        collectionNumber,
        courseId
      );

    const isCollectionExist =
      collection !== null ? true : false;

    if (isCollectionExist) {
      console.log('collection already exist');
    } else {
      const newCollection =
        await collectionService.addCollection(
          courseId,
          collectionNumber
        );
      console.log('newCollection', newCollection);
    }
  }
};

const deleteFile = async (
  csvFilePath: string
) => {
  fs.unlink(csvFilePath, (err) => {
    if (err && err.code == 'ENOENT') {
      console.info(
        "File doesn't exist, won't remove it."
      );
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
