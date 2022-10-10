import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class userEntity1664578046150
  implements MigrationInterface
{
  public async up(
    queryRunner: QueryRunner
  ): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE user_by (
        id VARCHAR(50) UNIQUE,
        first_name VARCHAR(30) NOT NULL
        );
      `
    );
  }

  public async down(
    queryRunner: QueryRunner
  ): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
