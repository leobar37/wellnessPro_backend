import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { DetailPayment } from "./DetailPayment";
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ length: 60 })
  name!: string;
  @Column("int")
  stock!: number;
  @Column("float4", { name: "price_unit" })
  priceUnit!: number;
  @Column("simple-json", { nullable: true })
  files!: string;
  @Column("float4", { name: "price_payment" })
  pricePayment!: number;
  @Column("json", { nullable: true })
  description!: string;
  @OneToMany((type) => DetailPayment, (detail) => detail.product)
  detailsPaymen!: Array<DetailPayment>;
}
