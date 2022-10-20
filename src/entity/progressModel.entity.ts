import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ProgressModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  subCollectionId!: number;

  @Column()
  sectionStep!: number;

  @Column()
  modelStep!: number;

  @Column()
  phraseStep!: number;

  @ManyToOne(
    () => User,
    (user) => user.progressModels
  )
  user!: User;
}
