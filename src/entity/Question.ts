import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Pool } from "./Poll";
import { Form } from "./Form";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("increment")
  id!: number;
  @Column("json")
  options!: string;
  @Column()
  required!: boolean;
  @OneToMany((type) => Pool, (pool) => pool.question)
  pools!: Array<Pool>;
  @ManyToOne((type) => Form, (form) => form.questions)
  @JoinColumn({ name: "id_form" })
  form!: Form;
}
