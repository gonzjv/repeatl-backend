import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseState } from './courseState.entity';
import { ModelSectionState } from './modelSectionState.entity';
import { WordSectionState } from './wordSectionState.entity';

@Entity()
export class CollectionState {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  collectionId!: number;

  @Column()
  isCompleted!: boolean;

  @Column()
  inLearning!: boolean;

  @ManyToOne(
    () => CourseState,
    (courseState) => courseState.collectionStateArr,
    {
      onDelete: 'CASCADE',
    }
  )
  courseState!: CourseState;

  @OneToMany(
    () => WordSectionState,
    (state) => state.collectionState
  )
  wordSectionStateArr!: WordSectionState[];

  @OneToMany(
    () => ModelSectionState,
    (state) => state.collectionState
  )
  modelSectionStateArr!: ModelSectionState[];
}
