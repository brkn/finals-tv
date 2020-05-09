import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  Unique,
} from "typeorm";
import {
  IsDate,
  ArrayUnique,
  IsOptional,
  Min,
} from "class-validator";

import {Tournament} from "./tournament";

@Entity()
@Unique("Tournament has to be unique", ["tournamentId"])
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("date", {nullable: true})
  @IsOptional()
  @IsDate()
  date!: Date | null;

  @Column("varchar", {array: true})
  @ArrayUnique()
  teams!: [string, string]; // Teams should be just string for now

  @Column("integer")
  @Min(1)
  bestOf!: number;

  @OneToOne(
    (_type) => {
      return Tournament;
    },
    (tournament) => {
      return tournament.match;
    },
    {
      cascade: true,
      onUpdate: "CASCADE",
    },
  )
  tournament!: Tournament;

  @Column({type: "varchar", nullable: true})
  tournamentId?: string | null;

  construct(details: {
    teams: [string, string];
    date: Date | null;
    bestOf: number;
    tournament: Tournament;
    tournamentId: string | null;
  }) {
    this.teams = details.teams;
    this.date = details.date;
    this.bestOf = details.bestOf;
    this.tournament = details.tournament;
    this.tournamentId = details.tournamentId;
  }

  print() {
    const {
      id,
      teams,
      date,
      bestOf,
      tournament,
      tournamentId,
    } = this;

    return {
      id,
      teams,
      date,
      bestOf,
      tournamentId,
    };
  }
}
