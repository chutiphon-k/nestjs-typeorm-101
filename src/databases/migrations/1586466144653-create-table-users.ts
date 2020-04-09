import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1586466144653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: '_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            precision: 3,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            precision: 3,
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
