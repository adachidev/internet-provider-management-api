import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableConnection1681856389975 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
      try {
        await queryRunner.createTable(new Table({
          name:'connection',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              length: '36',
              isPrimary: true
            },
            {
              name: 'clientId',
              type: 'varchar',
              length: '36',
            },
            {
              name: 'latitude',
              type: 'varchar',
              length: '36',
            },
            {
              name: 'longitude',
              type: 'varchar',
              length: '36',
            },
            {
              name: 'boxId',
              type: 'varchar',
              length: '36',
            },
            {
              name: 'planId',
              type: 'varchar',
              length: '36',
            },
            {
              name: 'port',
              type: 'int',
            },
            {
              name: 'signal',
              type: 'decimal',
              length: '16,2',
              default: '0',
            },
            {
              name: 'type',
              type: 'varchar',
              length: '36',
            },                
            {
              name: 'username',
              type: 'varchar',
              length: '120',
            },                
            {
              name: 'password',
              type: 'varchar',
              length: '120',
            },                
            {
              name: 'ipV4Address',
              type: 'varchar',
              length: '36',
            },                
            {
              name: 'ipV4AddressFixed',
              type: 'int',
              default: '0',
            },                
            {
              name: 'ipV6Address',
              type: 'varchar',
              length: '36',
            },                
            {
              name: 'ipV6AddressFixed',
              type: 'int',
              default: '0',
            },                
            {
              name: 'observation',
              type: 'varchar',
              length: '250',
              isNullable: true,
            },
            {
              name: 'createdAt',
              type: 'timestamp',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'deletedAt',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'userCreatedId',
              type: 'varchar',
              length: '36',
              isNullable: true,
            },
            {
              name: 'userUpdatedId',
              type: 'varchar',
              length: '36',
              isNullable: true,
            },
            {
              name: 'userDeletedId',
              type: 'varchar',
              length: '36',
              isNullable: true,
            },
          ]
        }))

        await queryRunner.createForeignKey(
          'connection',
          new TableForeignKey({
              name: 'FK_CONNECTION_CLIENT',
              columnNames: ['clientId'],
              referencedTableName: 'client',
              referencedColumnNames: ['id'],
          }),
          );

          await queryRunner.createForeignKey(
          'connection',
          new TableForeignKey({
              name: 'FK_CONNECTION_BOX',
              columnNames: ['boxId'],
              referencedTableName: 'box',
              referencedColumnNames: ['id'],
          }),
          );

          await queryRunner.createForeignKey(
          'connection',
          new TableForeignKey({
              name: 'FK_CONNECTION_PLAN',
              columnNames: ['planId'],
              referencedTableName: 'plan',
              referencedColumnNames: ['id'],
          }),
          );

      } catch (error) {
        console.log({error})        
      }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(
        new Table({
          name: 'connection',
        }),
      );
    }

}
