import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Inscription } from "./Inscription";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({ length: 50, nullable: true, unique: true })
  user!: string;
  @Column({ length: 60 })
  name!: string;
  @Column({ length: 60, name: "last_name" })
  lastName!: string;
  @Column("json", { nullable: true })
  direccion!: string;
  @Column({ nullable: true })
  edad!: number;
  @Column()
  @Column({ length: 14, nullable: true })
  phone!: string;
  @Column({ length: 12, nullable: true })
  dni!: string;
  @Column({ default: false })
  isUser!: boolean;
  @Column({ length: 250, nullable: false, unique: true })
  email!: string;
  @Column({ length: 250, nullable: true })
  password!: string;
  @OneToMany((type) => Inscription, (ins) => ins.user)
  Inscriptions!: Inscription[];
}
