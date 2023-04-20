import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableOlt1681992060710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(new Table({
              name:'olt',
              columns: [
                {
                  name: 'id',
                  type: 'varchar',
                  length: '36',
                  isPrimary: true
                },
                {
                  name: 'description',
                  type: 'varchar',
                  length: '120',
                },
                {
                  name: 'code',
                  type: 'varchar',
                  length: '36',
                },
                {
                  name: 'vendor',
                  type: 'varchar',
                  length: '120',
                },
                {
                  name: 'model',
                  type: 'varchar',
                  length: '120',
                },
                {
                  name: 'status',
                  type: 'varchar',
                  length: '120',
                  default: '1',
                },
                {
                  name: 'interfaces',
                  type: 'int',
                  length: '1',
                },
                {
                  name: 'ipv4manager',
                  type: 'varchar',
                  length: '16',
                },
                {
                  name: 'macmanager',
                  type: 'varchar',
                  length: '18',
                },
                {
                    name: 'brasId',
                    type: 'varchar',
                    length: '36',
                },
                {
                  name: 'observation',
                  type: 'varchar',
                  length: '120',
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
            'olt',
            new TableForeignKey({
                name: 'FK_OLT_BRAS',
                columnNames: ['brasId'],
                referencedTableName: 'bras',
                referencedColumnNames: ['id'],
            }),
            );
            
            await queryRunner.createForeignKey(
            'olt',
            new TableForeignKey({
                name: 'FK_OLT_USERCREATED',
                columnNames: ['userCreatedId'],
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
            }),
            );
    
            await queryRunner.createForeignKey(
            'olt',
            new TableForeignKey({
                name: 'FK_OLT_USERUPDATED',
                columnNames: ['userUpdatedId'],
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
            }),
            );
    
            await queryRunner.createForeignKey(
            'olt',
            new TableForeignKey({
                name: 'FK_OLT_USERDELETED',
                columnNames: ['userDeletedId'],
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
            }),
            );

          }catch(error) {
            console.log({error})
          }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(
            new Table({
              name: 'olt',
            }),
          );
    }

}
