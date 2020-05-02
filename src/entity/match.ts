import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";
import {
  IsDate,
  ArrayUnique,
  ArrayMaxSize,
  ArrayMinSize,
} from "class-validator";

import {Team} from "./team";

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column("date")
  @IsDate()
  date!: Date;

  @Column()
  @ArrayUnique()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  teams!: Team[];

  @Column("integer")
  bestOf!: number;

  constructor(
    teams: Team[],
    bestOf: number,
  ) {
    super();

    this.teams = teams;
    this.bestOf = bestOf;
  }
}
