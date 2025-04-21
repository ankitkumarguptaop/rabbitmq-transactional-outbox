import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class OutboxMessage1745231907311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'outbox-message',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'message_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'routing_key',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'signature',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'message',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enumName: 'outbox_message_status_enum',
            enum: ['PENDING', 'SEND'],
            default: `'PENDING'`,
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
