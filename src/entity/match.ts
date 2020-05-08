import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from "typeorm";
import {
  IsDate,
  ArrayUnique,
  ArrayMaxSize,
  ArrayMinSize,
} from "class-validator";

import {Team} from "./team";
import {Tournament} from "./tournament";

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column("date")
  @IsDate()
  date!: Date; /*

  @Column("array")
  @ArrayUnique()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  teams!: Team[]; */

  @Column("integer")
  bestOf!: number;

  @OneToOne(
    (_type) => {
      return Tournament;
    },
    (tournament) => {
      return tournament.match;
    },
  )
  tournament!: Tournament;

  construct(details: {
    teams: Team[];
    bestOf: number;
    tournament: Tournament;
  }) {
    /* this.teams = details.teams; */
    this.bestOf = details.bestOf;
    this.tournament = details.tournament;
  }
}
