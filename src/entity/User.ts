import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Inscription } from "./Inscription";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({ length: 50 })
  user!: string;
  @Column({ length: 60 })
  name!: string;
  @Column({ length: 60, name: "last_name" })
  lastName!: string;
  @Column({ length: 10 })
  phone!: string;
  @Column({ length: 12, nullable: true })
  dni!: string;
  @Column({ length: 250, nullable: false })
  email!: string;
  @Column({ length: 250, nullable: true })
  password!: string;
  @OneToMany((type) => Inscription, (ins) => ins.user)
  Inscriptions!: Inscription[];
}
