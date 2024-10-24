import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Define a entidade do produto no banco de dados
@Entity({ name: 'produto' })
export class ProdutoEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    nome: string;

    @Column({type: 'varchar'})
    armazem: string;

    @Column({type: 'int'})
    quantidade: number;

    @Column({type: 'blob'})
    perecivel: boolean;

    @Column({type: 'blob'})
    data_de_validade: Date;

    @Column({type: 'int'})
    preco_aquisicao_unitario: number
}