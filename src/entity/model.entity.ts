import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModelSubCollection } from './modelSubCollection.entity';

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
    () => ModelSubCollection,
    (modelSubCollection) =>
      modelSubCollection.models
  )
  modelSubCollection!: ModelSubCollection;
}
