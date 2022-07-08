import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomerAddress1657226923692 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'customer_address',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'cep',
          type: 'varchar',
        },
        {
          name: 'number',
          type: 'varchar',
        },
        {
          name: 'street',
          type: 'varchar',
        },
        {
          name: 'district',
          type: 'varchar',
        },
        {
          name: 'state',
          type: 'varchar',
        },
        {
          name: 'country',
          type: 'varchar',
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
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_address');
  }

}
