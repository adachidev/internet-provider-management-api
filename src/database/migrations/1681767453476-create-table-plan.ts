import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTablePlan1681767453476 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(new Table({
        name:'plan',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar',
            length: '120',
          },
          {
            name: 'value',
            type: 'decimal',
            length: '16,2',
            default: '0',
          },
          {
            name: 'download',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'upload',
            type: 'varchar',
            length: '20',
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
        'plan',
        new TableForeignKey({
            name: 'FK_PLAN_USERCREATED',
            columnNames: ['userCreatedId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }),
        );

        await queryRunner.createForeignKey(
        'plan',
        new TableForeignKey({
            name: 'FK_PLAN_USERUPDATED',
            columnNames: ['userUpdatedId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }),
        );

        await queryRunner.createForeignKey(
        'plan',
        new TableForeignKey({
            name: 'FK_PLAN_USERDELETED',
            columnNames: ['userDeletedId'],
            referencedTableName: 'user',
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
        name: 'plan',
      }),
    );
  }

}
