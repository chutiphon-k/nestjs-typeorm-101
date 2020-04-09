import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnDisplayNameToUsers1586466457143
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'displayName',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'displayName');
  }
}
