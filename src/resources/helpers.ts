import csvToJson from 'csvtojson';

const addDataFromCsv = async (
  csvFilePath: string
) => {
  const csvRowArr = await csvToJson().fromFile(
    csvFilePath
  );
  console.log('data', csvRowArr);

  // csvRowArr.forEach(async (elem) => {
  //   const separator = '/';
  //   const labelPartArr =
  //     elem.label.split(separator);
  //   console.log(
  //     'labelPartArr',
  //     labelPartArr
  //   );

  //   const collectionNumber =
  //     labelPartArr[0];

  //   const collectionArr =
  //     await collectionRepo.find({
  //       relations: { course: true },
  //       where: {
  //         course: {
  //           id: Number(req.params.courseId),
  //         },
  //       },
  //     });
  //   console.log(
  //     'collectionNumber',
  //     collectionNumber
  //   );
  //   console.log(
  //     'collectionArr',
  //     collectionArr
  //   );

  //   const course =
  //     await courseRepo.findOneBy({
  //       id: Number(req.params.courseId),
  //     });

  //   const newCollection =
  //     collectionRepo.create({
  //       number: collectionNumber,
  //       course: course!,
  //     });

  //   const results =
  //     await collectionRepo.save(
  //       newCollection
  //     );
  //   console.log('results', results);

  //   // const phrase = phraseRepo.create({
  //   //   label: elem.label,
  //   //   native: elem.native,
  //   //   foreign: elem.foreign,
  //   // });

  //   // await phraseRepo.save(phrase);
  // });
};

export { addDataFromCsv };
