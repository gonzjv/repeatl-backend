import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CollectionState } from './collectionState.entity';
import { WordState } from './wordState.entity';

@Entity()
export class WordSectionState {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  wordSectionId!: number;

  @Column()
  isCompleted!: boolean;

  @Column()
  inLearning!: boolean;

  @Column()
  isIntroActive!: boolean;

  @Column()
  isFirstRepeatActive!: boolean;

  @Column()
  isSecondRepeatActive!: boolean;

  @ManyToOne(
    () => CollectionState,
    (state) => state.wordSectionStateArr,
    {
      onDelete: 'CASCADE',
    }
  )
  collectionState!: CollectionState;

  @OneToMany(
    () => WordState,
    (wordState) => wordState.wordSectionState
  )
  wordStateArr!: WordState[];
}
