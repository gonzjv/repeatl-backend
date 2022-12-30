import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Progress } from './progress.entity';
import { ProgressModel } from './progressModel.entity';
import { ProgressWord } from './progressWord.entity';

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

  @OneToMany(
    () => ProgressWord,
    (progress) => progress.user
  )
  progressWordArr!: ProgressWord[];

  @OneToOne(() => Progress, (progress) => progress.user)
  @JoinColumn()
  progress!: Progress;
}
