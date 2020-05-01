import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";
import {
  IsDate,
  IsUrl,
} from "class-validator";

@Entity()
// @Unique(["link"])
export class Tournament extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column()
    @IsDate()
    date!: Date;

  /* @Column()
    @IsUrl()
    source!: string;

    @Column("varchar", {array: true})
    authors!: string[]; */

  /*
    Organizer:Ilusion eSports
    Sponsor:LOOT.BET
    Version:7.26a – 7.26b
    Type:Online
    Location:CIS CIS
    Dates:Apr 24 - May 4, 2020
    Teams:12
    Format:Double-elimination
    Prize Pool:$5,000 USD
    Liquipedia Tier:Minor
    */
}
