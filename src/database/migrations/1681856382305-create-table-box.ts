import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableBox1681856382305 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(new Table({
        name:'box',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '100',
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
            name: 'address',
            type: 'varchar',
            length: '250',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'capacity',
            type: 'int',
          },
          {
            name: 'signal',
            type: 'decimal',
            length: '16,2',
            default: '0',
            isNullable: true,
          },
          {
            name: 'oltId',
            type: 'varchar',
            length: '36',
            isNullable: true,
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
        'box',
        new TableForeignKey({
            name: 'FK_BOX_USERCREATED',
            columnNames: ['userCreatedId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }),
        );
        
        await queryRunner.createForeignKey(
        'box',
        new TableForeignKey({
            name: 'FK_BOX_USERUPDATED',
            columnNames: ['userUpdatedId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }),
        );
        
        await queryRunner.createForeignKey(
        'box',
        new TableForeignKey({
            name: 'FK_BOX_USERDELETED',
            columnNames: ['userDeletedId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }),
        );

        await queryRunner.createForeignKey(
        'box',
        new TableForeignKey({
            name: 'FK_BOX_OLT',
            columnNames: ['oltId'],
            referencedTableName: 'olt',
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
        name: 'box',
      }),
    );
  }

}
