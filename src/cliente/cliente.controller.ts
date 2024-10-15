import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClienteDto } from './cliente.dto';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {

    constructor(private readonly clienteService: ClienteService) { }

    // Cria um novo cliente com os dados fornecidos no corpo da requisição
    @Post()
    create(@Body() cliente: ClienteDto) {
        this.clienteService.create(cliente);    
    }

    // Atualiza um cliente com os dados fornecidos no corpo da requisição
    @Put()
    update(@Body() cliente: ClienteDto) {
        this.clienteService.update(cliente);
    }

    // Remove um cliente com o ID fornecido no parâmetro da rota
    @Delete('/:id')
    remove(@Param('id') id: string){
        return this.clienteService.remove(id);
    }
}
