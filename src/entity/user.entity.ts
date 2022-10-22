import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProgressModel } from './progressModel.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @OneToMany(
    () => ProgressModel,
    (progress) => progress.user
  )
  progressModels!: ProgressModel[];
}
