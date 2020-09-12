import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Question } from "./Question";
@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ length: 200, nullable: true })
  name!: string;
  @Column("date", { default: () => "CURRENT_DATE" })
  created!: Date;
  @Column("json")
  description!: string;
  @Column()
  public!: boolean;
  @OneToMany((type) => Question, (ques) => ques.form)
  questions!: Array<Question>;
}
