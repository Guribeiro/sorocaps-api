import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStocks1657228503844 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'stocks',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'amount',
          type: 'integer'
        },
        {
          name: 'limit',
          type: 'integer'
        },
        {
          name: 'price_unit',
          type: 'decimal'
        },
        {
          name: "product_id",
          type: 'uuid',
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
          name: 'ProductForeignKey',
          referencedTableName: 'products',
          referencedColumnNames: ['id'],
          columnNames: ['product_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stocks')
  }
}
