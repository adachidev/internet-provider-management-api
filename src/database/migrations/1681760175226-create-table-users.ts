import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableUsers1681760175226 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(new Table({
        name:'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true
          },
          {
            name: 'email',
            type: 'varchar',
            length: '120',
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'isWaPhone',
            type: 'int',
            length: '1',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '120',
          },
          {
            name: 'enable',
            type: 'varchar',
            length: '120',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'codeForget',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'emailVerifiedAt',
            type: 'varchar',
            length: '120',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'int',
            length: '1',
            default: '2',
          },
          {
            name: 'accessLevel',
            type: 'varchar',
            length: '120',
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
        'user',
        new TableForeignKey({
            name: 'FK_USER_USERCREATED',
            columnNames: ['userCreatedId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }),
        );

        await queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
            name: 'FK_USER_USERUPDATED',
            columnNames: ['userUpdatedId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }),
        );

        await queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
            name: 'FK_USER_USERDELETED',
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
        name: 'user',
      }),
    );
    
  }

}
