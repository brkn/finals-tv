import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import {IsDate} from "class-validator";
import {Match} from "./match";

const TournamentTierEnum = [
  "premier",
  "major",
  "minor",
  "qualifier",
  "monthly",
  "show m."
] as const;

export type TournamentTier = typeof TournamentTierEnum[number];

const LocationEnum = [
  "online",
  "offline",
] as const;

export type Location = typeof LocationEnum[number];

@Entity()
@Unique("Unique tournament", [
  "name",
  "startDate",
  "endDate"
])
export class Tournament extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  name!: string;

  @Column()
  @IsDate()
  startDate!: Date;

  @Column()
  @IsDate()
  endDate!: Date;

  @Column("integer")
  prizePool!: number;

  @Column({
    type: "enum",
    enum: LocationEnum,
  })
  location!: Location;

  @Column({
    type: "enum",
    enum: TournamentTierEnum,
  })
  tier!: TournamentTier;

  @OneToOne(
    (_type) => {
      return Match;
    },
    {cascade: true},
  )
  @JoinColumn()
  match!: Match;

  construct(details: {
    name: string;
    startDate: Date;
    endDate: Date;
    prizePool: number;
    location: Location;
    tier: TournamentTier;
  }) {
    this.name = details.name;
    this.startDate = details.startDate;
    this.endDate = details.endDate;
    this.prizePool = details.prizePool;
    this.location = details.location;
    this.tier = details.tier;
  }
}
