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
