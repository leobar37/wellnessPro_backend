import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Inscription } from "./Inscription";
import { DetailPayment } from "./DetailPayment";
import { User } from "./User";
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
  @OneToMany((type) => DetailPayment, (detail) => detail.payment)
  detaillsPayment!: Array<DetailPayment>;
  @ManyToOne((type) => User, (us) => us.id)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
