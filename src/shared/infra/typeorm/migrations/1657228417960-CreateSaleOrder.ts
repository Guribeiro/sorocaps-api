import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSaleOrder1657228417960 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'sale_orders',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'customer_id',
          type: 'uuid',
          isNullable: true,
        },
        {
          name: 'customer_name',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'status',
          type: 'varchar',
        },
        {
          name: 'price',
          type: 'decimal',
          isNullable: true
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()",
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()",
        },
      ],
      foreignKeys: [
        {
          name: 'customerForeignkey',
          referencedTableName: 'customers',
          referencedColumnNames: ['id'],
          columnNames: ['customer_id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sale_orders');
  }
}
