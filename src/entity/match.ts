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
  IsOptional,
} from "class-validator";

import {Team} from "./team";
import {Tournament} from "./tournament";

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column("date", {nullable: true})
  @IsOptional()
  @IsDate()
  date!: Date | null;

  @Column("varchar", {array: true})
  @ArrayUnique()
  teams!: [string, string]; // Teams should be just string for now

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
    teams: [string, string];
    date: Date | null;
    bestOf: number;
    tournament: Tournament;
  }) {
    this.teams = details.teams;
    this.date = details.date;
    this.bestOf = details.bestOf;
    this.tournament = details.tournament;
  }
}
