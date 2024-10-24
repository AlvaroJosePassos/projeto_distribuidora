import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoDto } from './produto.dto';

@Controller('produto')
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService ) {}

    // Cria um novo produto com os dados fornecidos no corpo da requisição
    @Post()
    async create(@Body() produto: ProdutoDto) {
        await this.produtoService.create(produto);    
    }

    // Recupera um produto pelo nome fornecido na URL
    @Get('/:nome')
    async findByNome(@Param('nome') nome: string): Promise<ProdutoDto> {
        return this.produtoService.findByNome(nome)
    }

    // Atualiza um produto com os dados fornecidos no corpo da requisição
    @Put()
    async update(@Body() cliente:ProdutoDto) {
        this.produtoService.update(cliente);
    }

    // Remove um produto com o ID fornecido no parâmetro da rota
    @Delete('/:id')
    async remove(@Param('id') id: string){
        return this.produtoService.remove(id);
    }
}
