import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";

@Entity()
@Unique("Team name must be unique", ["name"])
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column({
    length: 50,
  })
  name!: string;

  construct(name: string) {
    this.name = name;
  }
}
