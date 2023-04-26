import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableConnection1682507723503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {

            await queryRunner.addColumn('connection', new TableColumn({
                name: 'dueDate',
                type: 'int',
                length: '2',
                isNullable: true,
            }));

            await queryRunner.addColumn('connection', new TableColumn({
                name: 'observationDate',
                type: 'timestamp',
                isNullable: true,
            }));

            
        } catch (error) {
            console.log({error})            
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {

            await queryRunner.dropColumn('connection', 'dueDate');

            await queryRunner.dropColumn('connection', 'observationDate');

        } catch (error) {
            console.log({error})            
        }
    }

}
