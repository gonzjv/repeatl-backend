import { repeatlDataSource } from '../../app-data-source';
import { Word } from '../entity/word.entity';
import { WordSection } from '../entity/wordSection';

const wordRepo = repeatlDataSource.getRepository(Word);
const wordSectionRepo =
  repeatlDataSource.getRepository(WordSection);

export interface IWord {
  native: string;
  foreign: string;
}

const addWord = async (
  wordSectionId: number,
  wordData: IWord
) => {
  const wordSection = await wordSectionRepo.findOneBy({
    id: wordSectionId,
  });

  const word = wordRepo.create({
    native: wordData.native,
    foreign: wordData.foreign,
    wordSection: wordSection!,
  });

  const results = await wordRepo.save(word);
  return results;
};

// const getPhrase = async (native: string, modelId: number) =>
//   await phraseRepo.findOne({
//     relations: { model: true },
//     where: {
//       native: native,
//       model: { id: modelId },
//     },
//   });

export { addWord };
