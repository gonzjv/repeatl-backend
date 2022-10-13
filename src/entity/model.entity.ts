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
  phrase1!: string;

  @Column()
  phrase2!: string;

  @Column()
  phrase3!: string;

  @Column()
  number!: number;

  @ManyToOne(
    () => ModelSection,
    (modelSection) => modelSection.models
  )
  modelSection!: ModelSection;
  // @ManyToOne(
  //   () => ModelSubCollection,
  //   (modelSubCollection) =>
  //     modelSubCollection.models
  // )
  // modelSubCollection!: ModelSubCollection;
}
