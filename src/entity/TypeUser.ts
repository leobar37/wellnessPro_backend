import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "type_user" })
export class TypeUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name!: string;
  @Column("json")
  description: any;
}
