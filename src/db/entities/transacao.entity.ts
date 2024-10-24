import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Define a entidade de transação no banco de dados
@Entity({ name: 'transacao' })
export class TransacaoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    email_comprador: string;

    @Column({type: 'varchar'})
    produto: string;

    @Column({type: 'int'})
    quantidade: number;

    @Column({type: 'int'})
    valor_da_transacao: number;

    @Column({type: 'blob'})
    data_da_transacao: Date;

    @Column({type: 'varchar'})
    origem: string;

    @Column({type: 'varchar'})
    destino: string;

    @Column({type: 'blob'})
    data_de_entrega: Date;
}