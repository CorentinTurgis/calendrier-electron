// src/entity/Event.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  description: string;
}
