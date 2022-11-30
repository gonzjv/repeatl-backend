import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { ModelSection } from './modelSection.entity';
// import { ModelSubCollection } from './modelSubCollection.entity';

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

  @OneToMany(
    () => ModelSection,
    (modelSection) => modelSection.collection
  )
  modelSections!: ModelSection[];
}
