import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WordSection } from './wordSection.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  native!: string;

  @Column()
  foreign!: string;

  @Column()
  mnemoTag!: string;

  @Column()
  transcription!: string;

  @ManyToOne(
    () => WordSection,
    (wordSection) => wordSection.words,
    {
      onDelete: 'CASCADE',
    }
  )
  wordSection!: WordSection;
}
