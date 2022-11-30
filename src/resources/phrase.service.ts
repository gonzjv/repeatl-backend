import { repeatlDataSource } from '../../app-data-source';
import { Model } from '../entity/model.entity';
import { Phrase } from '../entity/phrase.entity';

const modelRepo = repeatlDataSource.getRepository(Model);
const phraseRepo = repeatlDataSource.getRepository(Phrase);

export interface IPhrase {
  label: string;
  native: string;
  foreign: string;
}

const addPhrase = async (
  modelId: number,
  phraseData: IPhrase
) => {
  const model = await modelRepo.findOneBy({
    id: modelId,
  });

  const phrase = phraseRepo.create({
    label: phraseData.label,
    native: phraseData.native,
    foreign: phraseData.foreign,
    model: model!,
  });

  const results = await phraseRepo.save(phrase);
  return results;
};

export { addPhrase };
