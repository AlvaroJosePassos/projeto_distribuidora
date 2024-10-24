import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransacaoService } from './transacao.service';
import { FindAllParameters, TransacaoDto } from './transacao.dto';

// Aplica o guard de autenticação a todas as rotas deste controlador
@UseGuards(AuthGuard)
@Controller('transacao')
export class TransacaoController {

    constructor(private readonly transacaoService: TransacaoService) { }

    // Busca todas as transações com base nos parâmetros fornecidos na query string
    @Get() 
    async findAll(@Query() params: FindAllParameters): Promise<TransacaoDto[]> {
        return await this.transacaoService.findAll(params);
    }

    // Cria uma nova transação com os dados fornecidos no corpo da requisição
    @Post()
    async create(@Body() transacao: TransacaoDto) {
        await this.transacaoService.create(transacao);    
    }

    // Marca uma transação como entregu com o ID fornecido no parâmetro da rota
    @Put('/:id')
    async entregue(@Param('id') id: string) {
        await this.transacaoService.entregue(id);
    }

    // Remove uma transação com o ID fornecido no parâmetro da rota
    @Delete('/:id')
    async remove(@Param('id') id: string){
        return this.transacaoService.remove(id);
    }
}
