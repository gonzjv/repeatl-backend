import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CollectionState } from './collectionState.entity';
import { ModelState } from './modelState.entity';

@Entity()
export class ModelSectionState {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  modelSectionId!: number;

  @Column()
  isCompleted!: boolean;

  @Column()
  inLearning!: boolean;

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
    (state) => state.modelSectionStateArr,
    {
      onDelete: 'CASCADE',
    }
  )
  collectionState!: CollectionState;

  @OneToMany(
    () => ModelState,
    (modelState) => modelState.modelSectionState
  )
  modelStateArr!: ModelState[];
}
