import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class AddTeamsAndDateToMatch1589025172402
implements MigrationInterface {
  name = "AddTeamsAndDateToMatch1589025172402";

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"match\" ADD \"teams\" character varying array NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE \"match\" ALTER COLUMN \"date\" DROP NOT NULL",
      undefined,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"match\" ALTER COLUMN \"date\" SET NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE \"match\" DROP COLUMN \"teams\"",
      undefined,
    );
  }
}
