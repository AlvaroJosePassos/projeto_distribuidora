import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoDto } from './produto.dto';

@Controller('produto')
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService ) {}

    // Cria um novo produto com os dados fornecidos no corpo da requisição
    @Post()
    create(@Body() produto: ProdutoDto) {
        this.produtoService.create(produto);    
    }

    // Atualiza um produto com os dados fornecidos no corpo da requisição
    @Put()
    update(@Body() cliente:ProdutoDto) {
        this.produtoService.update(cliente);
    }

    // Remove um produto com o ID fornecido no parâmetro da rota
    @Delete('/:id')
    remove(@Param('id') id: string){
        return this.produtoService.remove(id);
    }
}
