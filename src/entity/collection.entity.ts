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
import { WordSection } from './wordSection.entity';
// import { ModelSubCollection } from './modelSubCollection.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  number!: string;

  @ManyToOne(() => Course, (course) => course.collections, {
    onDelete: 'CASCADE',
  })
  course!: Course;

  @OneToMany(
    () => ModelSection,
    (modelSection) => modelSection.collection
  )
  modelSections!: ModelSection[];

  @OneToMany(
    () => WordSection,
    (wordSection) => wordSection.collection
  )
  wordSections!: WordSection[];
}
