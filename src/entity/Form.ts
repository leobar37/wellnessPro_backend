import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Question } from "./Question";
@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column("date")
  created!: Date;
  @Column("text")
  description!: string;
  @Column()
  public!: boolean;
  @OneToMany((type) => Question, (ques) => ques.form)
  questions!: Array<Question>;
}
