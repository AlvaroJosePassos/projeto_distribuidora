import { MigrationInterface, QueryRunner } from "typeorm";

export class TransacaoTable1729138207408 implements MigrationInterface {

    // Método executado ao aplicar a migração
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cria a tabela 'transacao' com as colunas e tipos de dados especificados
        await queryRunner.query(`
        CREATE TABLE transacao (
            id varchar(256) NOT NULL, // Identificador único da transação
            email_comprador varchar(256) NOT NULL, // Email do comprador
            produto varchar(256) NOT NULL, // Nome do produto transacionado
            quantidade int NOT NULL, // Quantidade do produto transacionado
            valor_da_transacao int NOT NULL, // Valor total da transação
            data_da_transacao timestamp NOT NULL, // Data da transação
            origem varchar(256) NOT NULL, // Local de origem da transação
            destino varchar(256) NOT NULL, // Local de destino da transação
            data_de_entrega timestamp, // Data prevista para entrega (opcional)
            CONSTRAINT transacao_pk PRIMARY KEY (id) // Define a chave primária da tabela
        );
        `);
    }

    // Método executado ao reverter a migração
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove a tabela 'transacao' se existir
        await queryRunner.query(`DROP TABLE IF EXISTS transacao;`);
    }

}
