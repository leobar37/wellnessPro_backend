import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetailInscription } from "./DetailInscription";
import { Inscription } from "./Inscription";

@Entity()
export class Requirement {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ nullable: true })
  idProducto!: number;
  @Column({ length: 50 })
  type!: string;
  @Column({ nullable: true, length: 180 })
  description!: string;
  @ManyToMany((type) => DetailInscription, (detail) => detail.requirements)
  @JoinTable({
    name: "detail_requirement",
    joinColumn: {
      name: "id_requirement",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "id_detail_inscription",
      referencedColumnName: "id",
    },
  })
  detailsInscription!: Array<DetailInscription>;
  @ManyToOne((type) => Inscription, (re) => re.requeriments)
  inscription!: Inscription;
}
