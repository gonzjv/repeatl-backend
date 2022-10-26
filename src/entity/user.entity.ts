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
  email!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;

  @OneToMany(
    () => ProgressModel,
    (progress) => progress.user
  )
  progressModels!: ProgressModel[];
}
