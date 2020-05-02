import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class AddUniqueTournamentConstraint1588448266440
implements MigrationInterface {
  name =
    "AddUniqueTournamentConstraint1588448266440";

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"tournament\" ADD CONSTRAINT \"Unique tournament\" UNIQUE (\"name\", \"startDate\", \"endDate\")",
      undefined,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"tournament\" DROP CONSTRAINT \"Unique tournament\"",
      undefined,
    );
  }
}
