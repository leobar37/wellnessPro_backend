import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  JoinColumn,
} from "typeorm";
import { DetailInscription } from "./DetailInscription";
import { Inscription } from "./Inscription";
import { Question } from "./Question";

@Entity()
@Unique("key_pool", ["question", "inscription"])
export class Pool {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column("json", { nullable: true })
  response!: string;
  @ManyToOne((type) => DetailInscription, (ins) => ins.pools, {
    nullable: false,
  })
  @JoinColumn({ name: "inscription_id" })
  inscription!: Inscription;
  @ManyToOne((type) => Question, (ques) => ques.pools, { nullable: false })
  @JoinColumn({ name: "question_id" })
  question!: Question;
}
