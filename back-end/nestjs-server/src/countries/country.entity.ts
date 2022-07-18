import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ISO: string;

  @Column({type: "decimal"})
  VAT: number;
}