import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ClienteDto } from './cliente.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/db/entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clientesRepository: Repository<ClienteEntity>
    ) { }

    private clientes: ClienteDto[] = []

    // Método para criar um novo cliente
    async create(cliente: ClienteDto) {
        const clienteAlreadyRegistered = await this.findByEmail(cliente.email);

        // Verifica se o cliente já está cadastrado
        if (clienteAlreadyRegistered) {
            throw new ConflictException(`Cliente '${cliente.nome}' já cadastrado`);
        }

        const dbCliente = new ClienteEntity();

        // Mapeia os dados do DTO para a entidade
        dbCliente.telefone = cliente.telefone;
        dbCliente.email = cliente.email;
        dbCliente.localidade = cliente.localidade;
        dbCliente.nome = cliente.nome;
        if (cliente.qtd_de_transacoes === null || cliente.qtd_de_transacoes === undefined) {
            dbCliente.qtd_de_transacoes = 0;
        } else {
            dbCliente.qtd_de_transacoes = cliente.qtd_de_transacoes;
        }
        dbCliente.data_de_cadastro = new Date();
        // Gera um ID único para o cliente
        dbCliente.id = uuid();
        // Criptografa a senha do cliente
        dbCliente.senha = bcryptHashSync(cliente.senha, 10);

        // Salva o cliente no banco de dados
        const { id, email } = await this.clientesRepository.save(dbCliente);

        return { id, email };
    }

    // Método para encontrar um cliente pelo email
    async findByEmail(email: string): Promise<ClienteDto> {
        const clienteFound = await this.clientesRepository.findOne({
            where: { email }
        });

        // Se o cliente não for encontrado, retorna null
        if (!clienteFound) {
            return null;
        }

        // Mapeia os dados da entidade para o DTO
        return {
            id: clienteFound.id,
            nome: clienteFound.nome,
            localidade: clienteFound.localidade,
            data_de_cadastro: clienteFound.data_de_cadastro,
            qtd_de_transacoes: clienteFound.qtd_de_transacoes,
            email: clienteFound.email,
            telefone: clienteFound.telefone,
            senha: clienteFound.senha
        };
    }

    // Método para atualizar um cliente
    async update(cliente: ClienteDto) {
        const foundCliente = await this.findByEmail(cliente.email);

        // Verifica se o cliente está cadastrado
        if (!foundCliente) {
            throw new ConflictException(`Cliente '${cliente.nome}' não cadastrado`);
        }

        // Atualiza o cliente no banco de dados
        await this.clientesRepository.update(cliente.id, this.mapDtoToEntity(cliente));
    }

    // Método para remover um cliente pelo ID
    async remove(id: string) {
        const result = await this.clientesRepository.delete(id);

        // Verifica se a remoção foi bem-sucedida
        if (!result.affected) {
            throw new ConflictException(`Cliente '${id}' não cadastrado`);
        }
    }

    // Mapeia os dados do DTO para a entidade
    private mapDtoToEntity(clienteDto: ClienteDto): Partial<ClienteEntity> {
        return {
            id: clienteDto.id,
            nome: clienteDto.nome,
            localidade: clienteDto.localidade,
            data_de_cadastro: clienteDto.data_de_cadastro,
            qtd_de_transacoes: clienteDto.qtd_de_transacoes,
            email: clienteDto.email,
            telefone: clienteDto.telefone,
            senha: clienteDto.senha
        };
    }
}
