import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 50, nullable: true })
  code: string;
  @Column({ length: 80 })
  name: string;
  @Column({ length: 80, name: 'last_name' })
  lastName: string;
  @Column()
  email: string;
  @Column({ length: 80, nullable: true })
  phone: string;
}
