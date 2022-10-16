import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModelSection } from './modelSection.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label!: string;

  @Column()
  phraseNative1!: string;

  @Column()
  phraseNative2!: string;

  @Column()
  phraseNative3!: string;

  @Column()
  phraseForeign1!: string;

  @Column()
  phraseForeign2!: string;

  @Column()
  phraseForeign3!: string;

  @Column()
  number!: number;

  @ManyToOne(
    () => ModelSection,
    (modelSection) => modelSection.models
  )
  modelSection!: ModelSection;
}
