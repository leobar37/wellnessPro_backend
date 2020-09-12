import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Inscription } from "./Inscription";
import { Pool } from "./Poll";
import { Requirement } from "./Requiremtent";
import { User } from "./User";

@Entity("detail_inscription")
export class DetailInscription {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ nullable: true })
  idPago!: string;
  @Column({ nullable: true, default: false })
  status!: boolean;
  @Column("json", { nullable: true })
  metadata!: string;
  @ManyToOne((type) => User, (us) => us.detailInscriptions)
  user!: User;
  @OneToMany((type) => Pool, (ins) => ins.inscription)
  pools!: Array<Pool>;
  @ManyToOne((type) => Inscription, (ins) => ins.detailsInscriptions)
  inscription!: Inscription;
  @ManyToMany((type) => Requirement, (re) => re.detailsInscription)
  requirements!: Array<Requirement>;
}
