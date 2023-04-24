import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumTableBox1682198613554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.addColumn('box', new TableColumn({
                name: 'code',
                type: 'varchar',
                length: '36',
            }));
        } catch (error) {
            console.log({error})
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('box', 'code');
    }

}
