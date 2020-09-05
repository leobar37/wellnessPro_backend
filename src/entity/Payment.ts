import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Inscription } from "./Inscription";
import { DetailPayment } from "./DetailPayment";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column("float4")
  amount!: number;
  @Column({ default: () => "CURRENT_DATE" })
  created!: Date;
  @Column("text")
  metadata!: string;
  @Column({ nullable: true })
  description!: string;
  @ManyToOne((type) => Inscription, (ins) => ins.payments)
  inscription!: Inscription;

  @OneToMany((type) => DetailPayment, (detail) => detail.payment)
  detaillsPayment!: Array<DetailPayment>;
}
