import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";
import {
  Length,
  IsEmail,
} from "class-validator";
import {
  hashSync,
  genSaltSync,
  compareSync,
} from "bcrypt";

@Entity()
@Unique([
  "username",
  "email",
])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @Length(3, 15)
  username!: string;

  @Column()
  @Length(6, 25)
  password!: string;

  hashPassword() {
    const salt = genSaltSync(8);
    this.password = hashSync(this.password, salt);
  }

  checkIfUnencryptedPasswordMatches(unencryptedPassword: string) {
    return compareSync(unencryptedPassword, this.password);
  }

  construct({
    username,
    email,
    password,
  }: {username: string; email: string; password?: string}) {
    this.username = username;
    this.email = email;
    this.password = password ?? "";
  }
}
