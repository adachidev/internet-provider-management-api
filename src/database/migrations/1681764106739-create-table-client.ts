import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableClient1681764106739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(new Table({
              name:'client',
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
                  isPrimary: true
                },
                {
                  name: 'isWaPhone',
                  type: 'int',
                  length: '1',
                  isPrimary: true
                },
                {
                  name: 'isAdmPhone',
                  type: 'int',
                  length: '1',
                  isPrimary: true
                },
                {
                  name: 'phone2',
                  type: 'varchar',
                  length: '20',
                  isPrimary: true
                },
                {
                  name: 'firstName',
                  type: 'varchar',
                  length: '120',
                },
                {
                  name: 'midName',
                  type: 'varchar',
                  length: '120',
                  isPrimary: true
                },
                {
                  name: 'lastName',
                  type: 'varchar',
                  length: '120',
                },
                {
                  name: 'status',
                  type: 'int',
                  length: '1',
                  default: '2',
                },
                {
                  name: 'registerNumber',
                  type: 'varchar',
                  length: '30',
                },
                {
                  name: 'username',
                  type: 'varchar',
                  length: '100',
                },
                {
                  name: 'password',
                  type: 'varchar',
                  length: '100',
                },
                {
                  name: 'address',
                  type: 'varchar',
                  length: '250',
                },
                {
                  name: 'addressComplement',
                  type: 'varchar',
                  length: '250',
                  isNullable: true,
                },
                {
                  name: 'addressReference',
                  type: 'varchar',
                  length: '250',
                  isPrimary: true
                },
                {
                  name: 'addressRegion',
                  type: 'varchar',
                  length: '120',
                  isNullable: true,
                },



                {
                  name: 'addressNumber',
                  type: 'varchar',
                  length: '120',
                  isNullable: true,
                },
                {
                  name: 'addressDistrito',
                  type: 'varchar',
                  length: '120',
                  isNullable: true,
                },
                {
                  name: 'addressCity',
                  type: 'varchar',
                  length: '120',
                  isNullable: true,
                },
                {
                  name: 'addressState',
                  type: 'varchar',
                  length: '120',
                  isNullable: true,
                },
                {
                  name: 'addressCep',
                  type: 'varchar',
                  length: '120',
                  isNullable: true,
                },
                {
                  name: 'latLocation',
                  type: 'varchar',
                  length: '120',
                  isNullable: true,
                },
                {
                  name: 'lonLocation',
                  type: 'varchar',
                  length: '120',
                  isNullable: true,
                },
                {
                  name: 'birthDate',
                  type: 'timestamp',
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
              'client',
              new TableForeignKey({
                  name: 'FK_CLIENT_USERCREATED',
                  columnNames: ['userCreatedId'],
                  referencedTableName: 'user',
                  referencedColumnNames: ['id'],
              }),
              );
      
              await queryRunner.createForeignKey(
              'client',
              new TableForeignKey({
                  name: 'FK_CLIENT_USERUPDATED',
                  columnNames: ['userUpdatedId'],
                  referencedTableName: 'user',
                  referencedColumnNames: ['id'],
              }),
              );
      
              await queryRunner.createForeignKey(
              'client',
              new TableForeignKey({
                  name: 'FK_CLIENT_USERDELETED',
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
        name: 'client',
      }),
    );
  }

}
