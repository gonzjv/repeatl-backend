import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from './model.entity';

@Entity()
export class Phrase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label!: string;

  @Column()
  native!: string;

  @Column()
  foreign!: string;

  @ManyToOne(
    () => Model,
    (model) => model.phrases
  )
  model!: Model;
}
