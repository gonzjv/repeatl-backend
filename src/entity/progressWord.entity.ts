import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ProgressWord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  collectionId!: number;

  @Column()
  sectionStep!: number;

  @Column()
  wordStep!: number;

  @ManyToOne(() => User, (user) => user.progressWordArr)
  user!: User;
}
