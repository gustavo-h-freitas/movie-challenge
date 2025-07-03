import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Movie } from './movie.entity';

@Entity('movie_ratings')
export class MovieRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number; // 1-10 scale

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reviewerName: string;

  @ManyToOne(() => Movie, movie => movie.ratings)
  movie: Movie;

  @Column({ type: 'int' })
  movieId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 