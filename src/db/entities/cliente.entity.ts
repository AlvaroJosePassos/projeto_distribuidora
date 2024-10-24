import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Define a entidade do cliente no banco de dados
@Entity({ name: 'cliente' })
export class ClienteEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    nome: string;

    @Column({type: 'varchar'})
    localidade: string;

    @Column({type: 'blob'})
    data_de_cadastro: Date;

    @Column({type: 'int'})
    qtd_de_transacoes: number;

    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'varchar'})
    telefone: number;

    @Column({type: 'varchar'})
    senha: string
}