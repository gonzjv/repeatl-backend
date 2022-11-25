import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { ModelSubCollection } from './modelSubCollection.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  number!: string;

  @ManyToOne(
    () => Course,
    (course) => course.collections
  )
  course!: Course;

  @OneToOne(
    () => ModelSubCollection,
    (modelSubCollection) =>
      modelSubCollection.collection
  )
  modelSubCollection!: ModelSubCollection;
}
