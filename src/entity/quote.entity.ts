import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  quote: string;

  @Column({ length: 100, nullable: false })
  author: string;
}
