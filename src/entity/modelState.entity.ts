import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModelSectionState } from './modelSectionState.entity';

@Entity()
export class ModelState {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  modelId!: number;

  @Column()
  isCompleted!: boolean;

  @ManyToOne(
    () => ModelSectionState,
    (state) => state.modelStateArr,
    {
      onDelete: 'CASCADE',
    }
  )
  modelSectionState!: ModelSectionState;
}
