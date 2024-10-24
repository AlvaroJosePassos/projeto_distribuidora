import { ConflictException, Injectable } from '@nestjs/common';
import { FindAllParameters, TransacaoDto } from './transacao.dto';
import { v4 as uuid } from 'uuid';
import { ProdutoService } from 'src/produto/produto.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { TransacaoEntity } from 'src/db/entities/transacao.entity';

@Injectable()
export class TransacaoService {
    constructor(
        private readonly produtoService: ProdutoService,
        private readonly clienteService: ClienteService,
        @InjectRepository(TransacaoEntity)
        private readonly transacoesRepository: Repository<TransacaoEntity>
    ) {}

    // Método para encontrar todas as transações que correspondem aos parâmetros fornecidos
    async findAll(params: FindAllParameters): Promise<TransacaoDto[]> {
        const searchParams: FindOptionsWhere<TransacaoEntity> = {};

        if (params.email_comprador) {
            searchParams.email_comprador = Like(`%${params.email_comprador}%`);
        }
        if (params.produto) {
            searchParams.produto = Like(`%${params.produto}%`);
        }

        const transacoesFound = await this.transacoesRepository.find({
            where: searchParams
        });

        return transacoesFound.map(transacaoEntity => this.mapEntitytoDto(transacaoEntity));
    }

    // Método para encontrar uma transacao pelo ID
    async findById(id: string): Promise<TransacaoDto> {
        const transacaoFound = await this.transacoesRepository.findOne({
            where: { id }
        });

        if (!transacaoFound) {
            return null;
        }

        return this.mapEntitytoDto(transacaoFound);
    }

    // Método para criar uma nova transação
    async create(transacao: TransacaoDto) {
        const dbTransacao = new TransacaoEntity();
        // Gera um ID único para a transação
        dbTransacao.id = uuid();
        dbTransacao.data_da_transacao = new Date();
        dbTransacao.produto = transacao.produto;

        // Define a origem da transação com base no armazém do produto
        const produto = await this.produtoService.findByNome(transacao.produto);
        if (!produto) {
            throw new ConflictException(`Produto '${transacao.produto}' não encontrado`);
        }
        dbTransacao.origem = produto.armazem;

        dbTransacao.email_comprador = transacao.email_comprador;

        // Define o destino da transação com base na localidade do cliente
        const cliente = await this.clienteService.findByEmail(transacao.email_comprador);
        if (!cliente) {
            throw new ConflictException(`Cliente '${transacao.email_comprador}' não encontrado`);
        }
        dbTransacao.destino = cliente.localidade;
        dbTransacao.quantidade = transacao.quantidade;
        dbTransacao.valor_da_transacao = transacao.valor_da_transacao;

        const createdTransacao = await this.transacoesRepository.save(dbTransacao);
        return this.mapEntitytoDto(createdTransacao);
    }

    // Método para marcar uma transação como entregue
    async entregue(id: string) {
        const transacaoFound = await this.findById(id);
        if (!transacaoFound) {
            throw new ConflictException(`Transação '${id}' não cadastrada`);
        }

        // Define a data em que o produto foi entregue
        transacaoFound.data_de_entrega = new Date();
        await this.transacoesRepository.update(id, this.mapDtotoEntity(transacaoFound));
    }

    // Método para remover uma transação com base no ID fornecido
    async remove(id: string) {
        const result = await this.transacoesRepository.delete(id);
        if (!result.affected) {
            throw new ConflictException(`Transação '${id}' não cadastrada`);
        }
    }

    // Mapeia uma entidade Transação para DTO
    private mapEntitytoDto(transacaoEntity: TransacaoEntity): TransacaoDto {
        return {
            id: transacaoEntity.id,
            email_comprador: transacaoEntity.email_comprador,
            produto: transacaoEntity.produto,
            quantidade: transacaoEntity.quantidade,
            valor_da_transacao: transacaoEntity.valor_da_transacao,
            data_da_transacao: transacaoEntity.data_da_transacao,
            origem: transacaoEntity.origem,
            destino: transacaoEntity.destino,
            data_de_entrega: transacaoEntity.data_de_entrega,
        };
    }

    // Mapeia um DTO Transação para entidade
    private mapDtotoEntity(transacaoDto: TransacaoDto): Partial<TransacaoEntity> {
        return {
            id: transacaoDto.id,
            email_comprador: transacaoDto.email_comprador,
            produto: transacaoDto.produto,
            quantidade: transacaoDto.quantidade,
            valor_da_transacao: transacaoDto.valor_da_transacao,
            data_da_transacao: transacaoDto.data_da_transacao,
            origem: transacaoDto.origem,
            destino: transacaoDto.destino,
            data_de_entrega: transacaoDto.data_de_entrega
        };
    }
}
