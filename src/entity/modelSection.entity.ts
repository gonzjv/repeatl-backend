import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from './model.entity';
import { ModelSubCollection } from './modelSubCollection.entity';

@Entity()
export class ModelSection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label!: string;

  @Column()
  number!: number;

  @ManyToOne(
    () => ModelSubCollection,
    (modelSubCollection) =>
      modelSubCollection.modelSections
  )
  modelSubCollection!: ModelSubCollection;

  @OneToMany(
    () => Model,
    (model) => model.modelSection
  )
  models!: Model[];
}
