import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Inscription } from "./Inscription";
import { Question } from "./Question";

@Entity()
export class Pool {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column("json", { nullable: true })
  response!: string;
  @ManyToOne((type) => Inscription, (ins) => ins.pools, { nullable: false })
  inscription!: Inscription;
  @ManyToOne((type) => Question, (ques) => ques.pools, { nullable: false })
  question!: Question;
}
