import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AlterTableConnectionslog1682444377101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {

            await queryRunner.dropColumn('connectionslog', 'userId');

            await queryRunner.addColumn('connectionslog', new TableColumn({
                name: 'connectionId',
                type: 'varchar',
                length: '36',
            }));

            await queryRunner.createForeignKey(
                'connectionslog',
                new TableForeignKey({
                    name: 'FK_CONNECTIONSLOG_CONNECTION',
                    columnNames: ['connectionId'],
                    referencedTableName: 'connection',
                    referencedColumnNames: ['id'],
                }),
                );
  
        } catch (error) {
            console.log({error})            
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
