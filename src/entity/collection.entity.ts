import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { ModelSubCollection } from './modelSubCollection.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(
    () => Course,
    (course) => course.collections
  )
  course!: Course;

  @OneToMany(
    () => ModelSubCollection,
    (modelSubCollection) =>
      modelSubCollection.collection
  )
  modelSubCollections!: ModelSubCollection[];
}
