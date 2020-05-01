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
@Unique(["link"])
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  @IsUrl()
  link!: string;

  @Column()
  title!: string;

  @Column()
  teaser!: string;

  @Column()
  popularity!: number;

  @Column()
  @IsDate()
  publishDate!: Date;

  @Column()
  @IsUrl()
  source!: string;

  @Column()
  @IsUrl()
  thumbnail!: string;

  @Column("varchar", {array: true})
  authors!: string[];

  @Column("varchar", {array: true})
  topics!: string[];

  /* addTopic(topic: string) {
    topics.append(topic);
    commit to db
  } */
}
