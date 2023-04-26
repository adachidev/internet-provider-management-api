import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableConnection1682542988506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {

            await queryRunner.addColumn('connection', new TableColumn({
                name: 'daysAfterExpiration',
                type: 'int',
                length: '2',
                isNullable: true,
            }));

            
        } catch (error) {
            console.log({error})            
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropColumn('connection', 'daysAfterExpiration');
        } catch (error) {
            console.log({error})
        }
    }

}
