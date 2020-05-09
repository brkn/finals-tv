import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class InitializeTables1589042328082
implements MigrationInterface {
  name = "InitializeTables1589042328082";

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "create extension if not exists \"uuid-ossp\"",
      undefined,
    );
    await queryRunner.query(
      "CREATE TYPE \"tournament_location_enum\" AS ENUM('online', 'offline')",
      undefined,
    );
    await queryRunner.query(
      "CREATE TYPE \"tournament_tier_enum\" AS ENUM('premier', 'major', 'minor', 'qualifier', 'monthly', 'show m.')",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE \"tournament\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying NOT NULL, \"link\" character varying NOT NULL, \"startDate\" TIMESTAMP NOT NULL, \"endDate\" TIMESTAMP NOT NULL, \"prizePool\" integer NOT NULL, \"location\" \"tournament_location_enum\" NOT NULL, \"tier\" \"tournament_tier_enum\" NOT NULL, \"matchId\" uuid, CONSTRAINT \"Unique tournament\" UNIQUE (\"name\", \"startDate\", \"endDate\"), CONSTRAINT \"REL_67786c21258cc38cbe38a97773\" UNIQUE (\"matchId\"), CONSTRAINT \"PK_449f912ba2b62be003f0c22e767\" PRIMARY KEY (\"id\"))",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE \"match\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"date\" date, \"teams\" character varying array NOT NULL, \"bestOf\" integer NOT NULL, \"tournamentId\" character varying, CONSTRAINT \"Tournament has to be unique\" UNIQUE (\"tournamentId\"), CONSTRAINT \"PK_92b6c3a6631dd5b24a67c69f69d\" PRIMARY KEY (\"id\"))",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE \"team\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying(50) NOT NULL, CONSTRAINT \"Team name must be unique\" UNIQUE (\"name\"), CONSTRAINT \"PK_f57d8293406df4af348402e4b74\" PRIMARY KEY (\"id\"))",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE \"tournament\" ADD CONSTRAINT \"FK_67786c21258cc38cbe38a97773c\" FOREIGN KEY (\"matchId\") REFERENCES \"match\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"tournament\" DROP CONSTRAINT \"FK_67786c21258cc38cbe38a97773c\"",
      undefined,
    );
    await queryRunner.query(
      "DROP TABLE \"team\"",
      undefined,
    );
    await queryRunner.query(
      "DROP TABLE \"match\"",
      undefined,
    );
    await queryRunner.query(
      "DROP TABLE \"tournament\"",
      undefined,
    );
    await queryRunner.query(
      "DROP TYPE \"tournament_tier_enum\"",
      undefined,
    );
    await queryRunner.query(
      "DROP TYPE \"tournament_location_enum\"",
      undefined,
    );
  }
}
