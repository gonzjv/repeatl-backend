import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Collection } from './collection.entity';
import { Word } from './word.entity';

@Entity()
export class WordSection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  number!: string;

  @ManyToOne(
    () => Collection,
    (collection) => collection.wordSections,
    { onDelete: 'CASCADE' }
  )
  collection!: Collection;

  @OneToMany(() => Word, (word) => word.wordSection)
  words!: Word[];
}
