import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class AddShowMatchAsATournamentTier1588446829895
implements MigrationInterface {
  name =
    "AddShowMatchAsATournamentTier1588446829895";

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "ALTER TYPE \"public\".\"tournament_tier_enum\" RENAME TO \"tournament_tier_enum_old\"",
      undefined,
    );
    await queryRunner.query(
      "CREATE TYPE \"tournament_tier_enum\" AS ENUM('premier', 'major', 'minor', 'qualifier', 'monthly', 'show m.')",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE \"tournament\" ALTER COLUMN \"tier\" TYPE \"tournament_tier_enum\" USING \"tier\"::\"text\"::\"tournament_tier_enum\"",
      undefined,
    );
    await queryRunner.query(
      "DROP TYPE \"tournament_tier_enum_old\"",
      undefined,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"tournament_tier_enum_old\" AS ENUM('premier', 'major', 'minor', 'qualifier', 'monthly')",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE \"tournament\" ALTER COLUMN \"tier\" TYPE \"tournament_tier_enum_old\" USING \"tier\"::\"text\"::\"tournament_tier_enum_old\"",
      undefined,
    );
    await queryRunner.query(
      "DROP TYPE \"tournament_tier_enum\"",
      undefined,
    );
    await queryRunner.query(
      "ALTER TYPE \"tournament_tier_enum_old\" RENAME TO  \"tournament_tier_enum\"",
      undefined,
    );
  }
}
