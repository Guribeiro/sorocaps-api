import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserCustomer1657227048201 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'customers',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'cnpj',
          type: 'varchar',
        },
        {
          name: 'phone',
          type: 'varchar',
        },
        {
          name: 'customer_address_id',
          type: 'uuid',
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
          name: 'customerAddressForeignkey',
          referencedTableName: 'customer_address',
          referencedColumnNames: ['id'],
          columnNames: ['customer_address_id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
  }

}
