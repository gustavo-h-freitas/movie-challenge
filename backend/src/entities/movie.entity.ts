import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Actor } from './actor.entity';
import { MovieRating } from './movie-rating.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  releaseYear: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  genre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  director: string;

  @Column({ type: 'int', nullable: true })
  duration: number; // in minutes

  @ManyToMany(() => Actor, actor => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' }
  })
  actors: Actor[];

  @OneToMany(() => MovieRating, rating => rating.movie)
  ratings: MovieRating[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 