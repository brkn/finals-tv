import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import {IsDate} from "class-validator";
import {Match} from "./match";

const TournamentTierEnum = [
  "premier",
  "major",
  "minor",
  "qualifier",
  "monthly",
] as const;

export type TournamentTier = typeof TournamentTierEnum[number];

const LocationEnum = [
  "online",
  "offline",
] as const;

export type Location = typeof LocationEnum[number];

@Entity()
export class Tournament extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column({
    length: 30,
  })
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

  constructor(details: {
    name: string;
    tier: TournamentTier;
    startDate: Date;
    endDate: Date;
  }) {
    super();

    this.name = details.name;
    this.tier = details.tier;
    this.startDate = details.startDate;
    this.endDate = details.endDate;
  }
}
