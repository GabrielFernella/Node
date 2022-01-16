import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1642352077736
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Essa tabela não colocamos um id de identificação pois é uma tabela de relacionamento, as duas partes precisam existir para que ela tbm exista
        await queryRunner.createTable(
            new Table({
                name: "specifications_cars",
                columns: [
                    {
                        name: "car_id",
                        type: "uuid",
                    },
                    {
                        name: "specification_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        // Criando chaves estrangeiras separados
        await queryRunner.createForeignKey(
            "specifications_cars", // nome da tabela
            new TableForeignKey({
                name: "FKSpecificationCar", // nome de identificação para esse coluna
                referencedTableName: "specifications", // para qual tabela está sendo referenciada
                referencedColumnNames: ["id"], // qual coluna da tabela que está sendo referenciada
                columnNames: ["specification_id"], // A coluna da nossa tabela que recebe essa referencia
                onDelete: "SET NULL", // Caso haja uma exclusão, ele seta como nulo
                onUpdate: "SET NULL", // Caso haja uma update, ele seta como nulo
            })
        );

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKCarSpecification",
                referencedTableName: "cars",
                referencedColumnNames: ["id"],
                columnNames: ["car_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Para que funcione precisa fazer o trabalho reverso
        await queryRunner.dropForeignKey(
            "specifications_cars", // nome da tabela
            "FKCarSpecification" // Nome que vc atribuiu para identificação da coluna
        );

        await queryRunner.dropForeignKey(
            "specifications_cars",
            "FKSpecificationCar"
        );

        await queryRunner.dropTable("specifications_cars");
    }
}
