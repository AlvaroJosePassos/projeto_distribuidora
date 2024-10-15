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
    findAll(@Query() params: FindAllParameters): TransacaoDto[] {
        return this.transacaoService.findAll(params);
    }

    // Cria uma nova transação com os dados fornecidos no corpo da requisição
    @Post()
    create(@Body() transacao: TransacaoDto) {
        this.transacaoService.create(transacao);    
    }

    // Marca uma transação como entregue com os dados fornecidos no corpo da requisição
    @Put()
    entregue(@Body() transacao: TransacaoDto) {
        this.transacaoService.entregue(transacao);
    }

    // Remove uma transação com o ID fornecido no parâmetro da rota
    @Delete('/:id')
    remove(@Param('id') id: string){
        return this.transacaoService.remove(id);
    }
}
