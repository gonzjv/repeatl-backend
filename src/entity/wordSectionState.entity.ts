import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column()
  sameDayRepeatDone!: boolean;

  @Column()
  weeklyFirstRepeatDone!: boolean;

  @Column()
  weeklySecondRepeatDone!: boolean;

  @Column()
  weekly3done!: boolean;

  @Column()
  weekly4Done!: boolean;

  @Column()
  weekly5Done!: boolean;

  @Column()
  weekly6Done!: boolean;

  @Column()
  secondWeekDone!: boolean;

  @Column()
  secondWeekAndDayDone!: boolean;

  @Column()
  fourthWeekDone!: boolean;

  @Column()
  fourthWeekAndDayDone!: boolean;

  @Column()
  secondMonthDone!: boolean;

  @Column()
  secondMonthAndDayDone!: boolean;

  @Column()
  fourthMonthDone!: boolean;

  @Column()
  fourthMonthAndDayDone!: boolean;

  @Column()
  tenthMonthDone!: boolean;

  @Column()
  tenthMonthAndDayDone!: boolean;

  @UpdateDateColumn()
  updatedDate!: Date;

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
