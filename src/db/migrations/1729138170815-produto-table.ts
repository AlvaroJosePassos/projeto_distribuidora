import { MigrationInterface, QueryRunner } from "typeorm";

export class ProdutoTable1729138170815 implements MigrationInterface {

    // Método executado ao aplicar a migração
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cria a tabela 'produto' com as colunas e tipos de dados especificados
        await queryRunner.query(`
        CREATE TABLE produto (
            id varchar(256) NOT NULL,
            nome varchar(256) NOT NULL,
            armazem varchar(256) NOT NULL,
            quantidade int NOT NULL,
            perecivel int NOT NULL,
            data_de_validade timestamp,
            preco_aquisicao_unitario int NOT NULL,
            CONSTRAINT produto_pk PRIMARY KEY (id)
        );
        `)
    }

    // Método executado ao reverter a migração
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove a tabela 'produto' se existir
        await queryRunner.query(`DROP TABLE IF EXISTS produto;`)
    }

}
