import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { DetailInscription } from "./DetailInscription";
import { Person } from "./Person";
@Entity("users")
export class User extends Person {
  @Column({ length: 50, nullable: true, unique: true })
  user!: string;
  @Column({ length: 50, nullable: true })
  type!: string;
  @Column({ nullable: true })
  confirm!: boolean;
  @Column("json", { nullable: true })
  direccion!: string;
  @Column("date", { nullable: true })
  edad!: Date;
  @Column({ nullable: true })
  adviser: string;
  @Column({ length: 12, nullable: true })
  dni!: string;
  @Column({ default: false })
  isUser!: boolean;
  @Column({ length: 250, nullable: true })
  password!: string;
  @OneToMany((type) => DetailInscription, (ins) => ins.user)
  detailInscriptions!: DetailInscription[];
}
