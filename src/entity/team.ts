import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";

@Entity()
@Unique(["name"])
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column({
    length: 50,
  })
  name!: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
