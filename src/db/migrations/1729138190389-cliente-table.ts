import { MigrationInterface, QueryRunner } from "typeorm";

export class ClienteTable1729138190389 implements MigrationInterface {

    // Método executado ao aplicar a migração
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cria a tabela 'cliente' com as colunas e tipos de dados especificados
        await queryRunner.query(`
        CREATE TABLE cliente (
            id varchar(256) NOT NULL, // Identificador único do cliente
            nome varchar(256) NOT NULL, // Nome do cliente
            localidade varchar(256) NOT NULL, // Localização do cliente
            data_de_cadastro timestamp NOT NULL, // Data de cadastro do cliente
            qtd_de_transacoes int NOT NULL, // Quantidade de transações realizadas pelo cliente
            email varchar(256) NOT NULL, // Email do cliente
            telefone varchar(20), // Telefone do cliente (opcional)
            senha varchar(256) NOT NULL, // Senha do cliente (armazenada de forma criptografada)
            CONSTRAINT cliente_pk_id PRIMARY KEY (id), // Define a chave primária da tabela
            CONSTRAINT cliente_un_email UNIQUE (email) // Garante que o email do cliente seja único
        );
        `);
    }

    // Método executado ao reverter a migração
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove a tabela 'cliente' se existir
        await queryRunner.query(`DROP TABLE IF EXISTS cliente;`);
    }
}
