import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TransacaoDto } from './transacao.dto';
import {v4 as uuid} from 'uuid';
import { ProdutoService } from 'src/produto/produto.service';
import { ClienteService } from 'src/cliente/cliente.service';


@Injectable()
export class TransacaoService {

    constructor(private readonly produtoService: ProdutoService,
        private readonly clienteService: ClienteService
    ) {}

    // Array para armazenar as transações em memória
    private transacoes: TransacaoDto[] = []

    // Método para encontrar todas as transações que correspondem aos parâmetros fornecidos
    findAll(params: FindAllParameters): TransacaoDto[] {
        return this.transacoes.filter(t => {
            let match = true;

            // Filtra por data da transação, se fornecida
            if(params.data_da_transacao != undefined && t.data_da_transacao !== params.data_da_transacao){
                match = false;
            }

            // Filtra por email do comprador, se fornecido
            if(params.email_comprador != undefined && t.email_comprador !== params.email_comprador){
                match = false;
            }

            // Filtra por produto, se fornecido
            if(params.produto != undefined && t.produto !== params.produto){
                match = false;
            }

            return match;
        })
    }

    // Método para criar uma nova transação
    create(transacao: TransacaoDto){
        // Gera um ID único para a transação
        transacao.id = uuid();
        transacao.data_da_transacao = new Date();
        // Define a origem da transação com base no armazém do produto
        transacao.origem = this.produtoService.findByNome(transacao.produto).armazem
        // Define o destino da transação com base na localidade do cliente
        transacao.destino = this.clienteService.findByEmail(transacao.email_comprador).localidade

        this.transacoes.push(transacao)
    }

    // Método para marcar uma transação como entregue
    entregue(transacao: TransacaoDto) {
        let transacaoIndex = this.transacoes.findIndex(t => t.id === transacao.id);

        // Se a transação for encontrada, atualiza a data de entrega
        if(transacaoIndex >= 0) {
            this.transacoes[transacaoIndex].data_de_entrega = new Date();
            return;
        }

        throw new HttpException(`Transação com o id ${transacao.id} não foi encontrado`, HttpStatus.BAD_REQUEST)
    }

    // Método para remover uma transação com base no ID fornecido
    remove(id: string){
        let transacaoIndex = this.transacoes.findIndex(t => t.id === id);

        if(transacaoIndex >= 0){
            this.transacoes.splice(transacaoIndex, 1);
            return;
        }

        throw new HttpException(`Transação com o id ${id} não foi encontrado`, HttpStatus.BAD_REQUEST)
    }


}
