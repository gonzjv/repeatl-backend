import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Collection } from './collection.entity';
import { ModelSection } from './modelSection.entity';

@Entity()
export class ModelSubCollection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label!: string;

  @OneToOne(
    () => Collection,
    (collection) => collection.modelSubCollection
  )
  @JoinColumn()
  collection!: Collection;

  @OneToMany(
    () => ModelSection,
    (modelSection) =>
      modelSection.modelSubCollection
  )
  modelSections!: ModelSection[];
}
