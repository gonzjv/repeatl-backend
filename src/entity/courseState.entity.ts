import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CollectionState } from './collectionState.entity';
import { Progress } from './progress.entity';

@Entity()
export class CourseState {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  courseId!: number;

  @Column()
  isCompleted!: boolean;

  @Column()
  inLearning!: boolean;

  @ManyToOne(
    () => Progress,
    (progress) => progress.courseStateArr,
    {
      onDelete: 'CASCADE',
    }
  )
  progress!: Progress;

  @OneToMany(
    () => CollectionState,
    (state) => state.courseState
  )
  collectionStateArr!: CollectionState[];
}
