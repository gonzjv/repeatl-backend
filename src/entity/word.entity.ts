import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WordSection } from './wordSection';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  native!: string;

  @Column()
  foreign!: string;

  @ManyToOne(
    () => WordSection,
    (wordSection) => wordSection.words,
    {
      onDelete: 'CASCADE',
    }
  )
  wordSection!: WordSection;
}
