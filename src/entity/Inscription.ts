import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Payment } from "./Payment";
import { Pool } from "./Poll";
@Entity()
export class Inscription {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", nullable: true })
  create!: Date;
  @Column({ nullable: true })
  expiration!: Date;
  @Column("float4")
  amount!: number;
  @Column("json", { nullable: true })
  description!: string;
  @Column()
  valid!: boolean;
  @ManyToOne((type) => User, (user) => user.Inscriptions)
  @JoinColumn({ name: "id_user" })
  user!: User;
  @OneToMany((type) => Payment, (pay) => pay.inscription)
  payments!: Array<Payment>;
  @OneToMany((type) => Pool, (ins) => ins.inscription)
  pools!: Array<Pool>;
}
