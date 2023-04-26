import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableConnectionlog1682443080678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {

            await queryRunner.addColumn('connectionslog', new TableColumn({
                name: 'connectDate',
                type: 'timestamp',
                isNullable: false,
            }));

            await queryRunner.addColumn('connectionslog', new TableColumn({
                name: 'disconnectionDate',
                type: 'timestamp',
                isNullable: true,
            }));

        } catch (error) {
            console.log({error})
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropColumn('connectionslog', 'connectDate');
            await queryRunner.dropColumn('connectionslog', 'disconnectionDate');
        } catch (error) {
            console.log({error})
        }
    }

}
