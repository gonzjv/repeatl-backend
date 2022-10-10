import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Collection } from './collection.entity';
import { Model } from './model.entity';

@Entity()
export class ModelSubCollection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label!: string;

  @ManyToOne(
    () => Collection,
    (collection) => collection.modelSubCollections
  )
  collection!: Collection;

  @OneToMany(
    () => Model,
    (model) => model.modelSubCollection
  )
  models!: Model[];
}
