import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person";
@Entity()
export class Adviser extends Person {}
