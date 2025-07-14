import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity('actors')
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nationality: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
