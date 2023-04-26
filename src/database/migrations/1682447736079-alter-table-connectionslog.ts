import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableConnectionslog1682447736079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {

            await queryRunner.dropColumn('connectionslog', 'ipv6');

            await queryRunner.addColumn('connectionslog', new TableColumn({
                name: 'ipv6lan',
                type: 'varchar',
                length: '50',
            }));

            await queryRunner.addColumn('connectionslog', new TableColumn({
                name: 'ipv6wan',
                type: 'varchar',
                length: '50',
            }));

            
        } catch (error) {
            console.log({error})            
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
