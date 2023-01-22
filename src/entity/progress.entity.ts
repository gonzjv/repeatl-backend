import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseState } from './courseState.entity';
import { User } from './user.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(
    () => CourseState,
    (courseState) => courseState.progress
  )
  courseStateArr!: CourseState[];

  @OneToOne(() => User, (user) => user.progress)
  user!: User;
}
