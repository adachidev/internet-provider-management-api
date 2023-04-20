import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableBras1681990979669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(new Table({
              name:'bras',
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
              'bras',
              new TableForeignKey({
                  name: 'FK_BRAS_USERCREATED',
                  columnNames: ['userCreatedId'],
                  referencedTableName: 'user',
                  referencedColumnNames: ['id'],
              }),
              );
      
              await queryRunner.createForeignKey(
              'bras',
              new TableForeignKey({
                  name: 'FK_BRAS_USERUPDATED',
                  columnNames: ['userUpdatedId'],
                  referencedTableName: 'user',
                  referencedColumnNames: ['id'],
              }),
              );
      
              await queryRunner.createForeignKey(
              'bras',
              new TableForeignKey({
                  name: 'FK_BRAS_USERDELETED',
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
          name: 'bras',
        }),
      );
  
    }

}
