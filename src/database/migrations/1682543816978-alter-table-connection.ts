import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableConnection1682543816978 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {

            await queryRunner.addColumn('connection', new TableColumn({
                name: 'blockDate',
                type: 'timestamp',
                isNullable: true,
            }));

            
        } catch (error) {
            console.log({error})            
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropColumn('connection', 'blockDate');
        } catch (error) {
            console.log({error})
        }

    }

}
