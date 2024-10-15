import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProdutoDto } from './produto.dto';
import {v4 as uuid} from 'uuid';

@Injectable()
export class ProdutoService {

    private produtos: ProdutoDto[] = [];

    // Método para criar um novo produto
    create(produto: ProdutoDto) {
        // Gera um ID único para o produto
        produto.id = uuid();
        // Verifica se o produto é perecível com base na data de validade
        if (produto.data_de_validade === undefined || produto.data_de_validade === null) {
            produto.perecivel = false;
        } else {
            produto.perecivel = true;
        }
        this.produtos.push(produto);
        console.log(produto)
    }

    // Método para encontrar um produto pelo nome
    findByNome(nome: string): ProdutoDto {
        const foundProduto = this.produtos.filter(p => p.nome === nome);

        if (foundProduto.length){
            return foundProduto[0]
        }
    }

    // Método para atualizar um produto
    update(produto: ProdutoDto) {
        let produtoIndex = this.produtos.findIndex(p => p.nome === produto.nome);

        if(produtoIndex >= 0) {
            this.produtos[produtoIndex] = produto;
            return;
        }

        throw new HttpException(`Produto com o nome ${produto.nome} não foi encontrado`, HttpStatus.BAD_REQUEST)
    }

    // Método para remover um produto pelo ID
    remove(id: string){
        let produtoIndex = this.produtos.findIndex(p => p.id === id);

        if(produtoIndex >= 0){
            this.produtos.splice(produtoIndex, 1);
            return;
        }

        throw new HttpException(`Produto com o id ${id} não foi encontrado`, HttpStatus.BAD_REQUEST)
    }
}
