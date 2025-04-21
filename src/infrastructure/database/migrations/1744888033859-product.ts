import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Product1744888033859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'product',
            columns: [
              {
                name: 'id',
                type: 'serial',
                isPrimary: true,
              },
              {
                name: 'name',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'user_id',
                type: 'int',
                isNullable: false,
              },
              {
                name: 'description',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'price',
                type: 'int',
                isNullable: false,
              },
            ],
          }),
        );
        await queryRunner.createForeignKey(
          'product',
          new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          }),
        );
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
