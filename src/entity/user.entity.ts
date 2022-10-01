import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User_by {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_Name!: string;
}
