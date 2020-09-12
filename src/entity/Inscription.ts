import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { DetailInscription } from "./DetailInscription";
import { Requirement } from "./Requiremtent";
@Entity()
export class Inscription {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", nullable: true })
  create!: Date;
  @Column({ nullable: true })
  expiration!: Date;
  @Column("float4", { nullable: true })
  amount!: number;
  @Column("json", { nullable: true })
  description!: string;
  @Column({ nullable: true, default: true })
  valid!: boolean;
  @OneToMany((type) => DetailInscription, (detail) => detail.inscription)
  detailsInscriptions!: Array<DetailInscription>;
  @OneToMany((type) => Requirement, (re) => re.inscription)
  requeriments!: Requirement[];
}
