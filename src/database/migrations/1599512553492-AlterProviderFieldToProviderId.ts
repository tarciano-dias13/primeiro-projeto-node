import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProviderFieldToProviderId1599512553492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        //apagando a coluna provider e adicionando a coluna provider_id com as migrations
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn('appointments',
            new TableColumn(
                {
                    name: 'provider_id',
                    type: 'uuid',
                    isNullable: true,
                })
        );

        await queryRunner.createForeignKey('appointments',
            new TableForeignKey({
                name: 'AppointmentProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL', //QUANDO UM REGISTRO FOR DELETADO OS RELACIONAMENTOS FICARAM COM ID NULL
                onUpdate: 'CASCADE', // QUANDO HOUVER UM UPDATE SERA REPLICADO A TODOS OS REGISTROS RELACIONADOS
            })
        );
    };


    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn('appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }

}
