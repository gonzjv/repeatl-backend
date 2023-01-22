import { repeatlDataSource } from '../../app-data-source';
import { Word } from '../entity/word.entity';
import { WordSection } from '../entity/wordSection.entity';

const wordRepo = repeatlDataSource.getRepository(Word);
const wordSectionRepo =
  repeatlDataSource.getRepository(WordSection);

export interface IWord {
  native: string;
  foreign: string;
  mnemoTag: string;
  transcription: string;
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
    mnemoTag: wordData.mnemoTag,
    transcription: wordData.transcription,
    wordSection: wordSection!,
  });

  const results = await wordRepo.save(word);
  return results;
};

const getWord = async (
  native: string,
  wordSectionId: number
) =>
  await wordRepo.findOne({
    relations: { wordSection: true },
    where: {
      native: native,
      wordSection: { id: wordSectionId },
    },
  });

const getWordArr = async (wordSectionId: number) =>
  await wordRepo.find({
    relations: {
      wordSection: true,
    },
    where: {
      wordSection: {
        id: Number(wordSectionId),
      },
    },
  });

export { addWord, getWord, getWordArr };
