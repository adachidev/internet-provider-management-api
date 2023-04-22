import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableConnectionslog1682182301607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(new Table({
              name:'connectionslog',
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
                    isNullable: true,
                },
                {
                    name: 'interface',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'userId',
                    type: 'varchar',
                    length: '36',
                    isNullable: true,
                },
                {
                    name: 'ipv4',
                    type: 'varchar',
                    length: '16',
                    isNullable: true,
                },
                {
                    name: 'ipv6',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'mac',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                  name: 'brasId',
                  type: 'varchar',
                  length: '36',
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
              ]
            }))
      
          } catch (error) {
            console.log({error})        
          }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(
            new Table({
              name: 'connectionslog',
            }),
          );
    }

}
