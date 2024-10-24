import { ConflictException, Injectable } from '@nestjs/common';
import { ProdutoDto } from './produto.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/db/entities/produto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtosRepository: Repository<ProdutoEntity>
    ) { }

    // Método para criar um novo produto
    async create(produto: ProdutoDto) {
        const produtoAlreadyRegistered = await this.findByNome(produto.nome);

        // Verifica se o produto já está cadastrado
        if (produtoAlreadyRegistered) {
            throw new ConflictException(`Produto '${produto.nome}' já cadastrado`);
        }

        const dbProduto = new ProdutoEntity();

        // Define as propriedades do produto a partir do DTO
        dbProduto.nome = produto.nome;
        dbProduto.armazem = produto.armazem;
        dbProduto.quantidade = produto.quantidade;

        // Define se o produto é perecível ou não
        if (produto.data_de_validade === null || produto.data_de_validade === undefined) {
            dbProduto.perecivel = false;
        } else {
            dbProduto.perecivel = true;
            dbProduto.data_de_validade = produto.data_de_validade;
        }
        
        dbProduto.preco_aquisicao_unitario = produto.preco_aquisicao_unitario;
        
        // Gera um ID único para o produto
        dbProduto.id = uuid();

        // Salva o produto no banco de dados
        const createdProduto = await this.produtosRepository.save(dbProduto);

        return this.mapEntityToDto(createdProduto);
    }

    // Método para encontrar um produto pelo nome
    async findByNome(nome: string): Promise<ProdutoDto> {
        const produtoFound = await this.produtosRepository.findOne({
            where: { nome }
        });

        // Retorna null se o produto não for encontrado
        if (!produtoFound) {
            return null;
        }

        return this.mapEntityToDto(produtoFound);
    }

    // Método para atualizar um produto
    async update(produto: ProdutoDto) {
        const foundProduto = await this.findByNome(produto.nome);

        // Verifica se o produto existe antes de atualizar
        if (!foundProduto) {
            throw new ConflictException(`Produto '${produto.nome}' não cadastrado`);
        }

        await this.produtosRepository.update(produto.id, this.mapDtoToEntity(produto));
    }

    // Método para remover um produto pelo ID
    async remove(id: string) {
        const result = await this.produtosRepository.delete(id);

        // Lança uma exceção se nenhum produto foi afetado pela remoção
        if (!result.affected) {
            throw new ConflictException(`Produto '${id}' não cadastrado`);
        }
    }

    // Mapeia uma entidade Produto para DTO
    private mapEntityToDto(produtoEntity: ProdutoEntity) {
        return {
            id: produtoEntity.id,
            nome: produtoEntity.nome,
            armazem: produtoEntity.armazem,
            data_de_validade: produtoEntity.data_de_validade,
            perecivel: produtoEntity.perecivel,
            preco_aquisicao_unitario: produtoEntity.preco_aquisicao_unitario,
            quantidade: produtoEntity.quantidade,
        };
    }

    // Mapeia um DTO Produto para entidade
    private mapDtoToEntity(produtoDto: ProdutoDto) {
        return {
            id: produtoDto.id,
            nome: produtoDto.nome,
            armazem: produtoDto.armazem,
            data_de_validade: produtoDto.data_de_validade,
            perecivel: produtoDto.perecivel,
            preco_aquisicao_unitario: produtoDto.preco_aquisicao_unitario,
            quantidade: produtoDto.quantidade,
        };
    }
}
