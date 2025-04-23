import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreateInboxMessage1745299403564 implements MigrationInterface {
  name = 'CreateInboxMessage1745299403564';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inbox_message',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'message_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'handler_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'handled_at',
            type: 'TIMESTAMP',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'TIMESTAMP',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createUniqueConstraint(
      'inbox_message',
      new TableUnique({
        name: 'unique_index',
        columnNames: ['message_id', 'handler_name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('inbox_message', 'unique_index');
    await queryRunner.dropTable('inbox_message');
  }
}
