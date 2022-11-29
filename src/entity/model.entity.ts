import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModelSection } from './modelSection.entity';
import { Phrase } from './phrase.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label!: string;

  @Column()
  grammarSubject!: string;

  @Column()
  number!: string;

  @ManyToOne(
    () => ModelSection,
    (modelSection) => modelSection.models
  )
  modelSection!: ModelSection;

  @OneToMany(
    () => Phrase,
    (phrase) => phrase.model
  )
  phrases!: Phrase[];
}
