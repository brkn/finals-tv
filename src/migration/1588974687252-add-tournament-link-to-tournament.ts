import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class AddTournamentLinkToTournament1588974687252
implements MigrationInterface {
  name =
    "addTournamentLinkToTournament1588974687252";

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"tournament\" ADD \"link\" character varying NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE \"team\" ADD CONSTRAINT \"UQ_cf461f5b40cf1a2b8876011e1e1\" UNIQUE (\"name\")",
      undefined,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"team\" DROP CONSTRAINT \"UQ_cf461f5b40cf1a2b8876011e1e1\"",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE \"tournament\" DROP COLUMN \"link\"",
      undefined,
    );
  }
}
