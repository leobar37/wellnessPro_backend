import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { Payment } from "./Payment";
import { Product } from "./Product";
@Entity("detail_payment")
export class DetailPayment {
  @PrimaryColumn({ name: "id_payment" })
  idPayment!: string;
  @PrimaryColumn({ name: "id_product" })
  idProduct!: number;
  @Column("smallint")
  cant!: number;
  @Column("float", { nullable: true })
  price!: number;
  @ManyToOne((type) => Payment, (pay) => pay.detaillsPayment)
  @JoinColumn({ name: "id_payment" })
  payment!: Payment;

  @ManyToOne((type) => Product, (pr) => pr.detailsPaymen)
  @JoinColumn({ name: "id_product" })
  product!: Product;
}
