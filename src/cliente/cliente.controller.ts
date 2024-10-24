import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClienteDto } from './cliente.dto';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
    
    constructor(private readonly clienteService: ClienteService) { }

    // Busca um cliente pelo email fornecido no parâmetro da rota
    @Get('/:email')
    async findByEmail(@Param('email') email: string): Promise<ClienteDto> {
        return this.clienteService.findByEmail(email);
    }
    
    // Cria um novo cliente com os dados fornecidos no corpo da requisição
    @Post()
    async create(@Body() cliente: ClienteDto) {
        this.clienteService.create(cliente);
    }

    // Atualiza um cliente com os dados fornecidos no corpo da requisição
    @Put()
    async update(@Body() cliente: ClienteDto) {
        this.clienteService.update(cliente);
    }

    // Remove um cliente com o ID fornecido no parâmetro da rota
    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return this.clienteService.remove(id);
    }
}
