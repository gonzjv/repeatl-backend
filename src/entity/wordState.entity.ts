import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WordSectionState } from './wordSectionState.entity';

@Entity()
export class WordState {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  wordId!: number;

  @Column()
  isCompleted!: boolean;

  @Column()
  isFirstRepeatComplete!: boolean;

  @ManyToOne(
    () => WordSectionState,
    (state) => state.wordStateArr,
    {
      onDelete: 'CASCADE',
    }
  )
  wordSectionState!: WordSectionState;
}
