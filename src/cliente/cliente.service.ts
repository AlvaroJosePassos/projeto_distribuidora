import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ClienteDto } from './cliente.dto';
import {v4 as uuid} from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class ClienteService {

    private clientes: ClienteDto[] = []

    // Método para criar um novo cliente
    create(cliente: ClienteDto){
        // Gera um ID único para o cliente
        cliente.id = uuid();
        // Criptografa a senha do cliente
        cliente.senha = bcryptHashSync(cliente.senha, 10)
        this.clientes.push(cliente)
        console.log(cliente)
    }

    // Método para encontrar um cliente pelo email
    findByEmail(email: string): ClienteDto {
        const foundCliente = this.clientes.filter(c => c.email === email);

        if (foundCliente.length){
            return foundCliente[0]
        }
    }

    // Método para atualizar um cliente
    update(cliente: ClienteDto) {
        let clienteIndex = this.clientes.findIndex(c => c.nome === cliente.nome);

        if(clienteIndex >= 0) {
            cliente.data_de_cadastro = this.clientes[clienteIndex].data_de_cadastro
            cliente.id = this.clientes[clienteIndex].id
            // Criptografa a senha do cliente
            cliente.senha = bcryptHashSync(cliente.senha, 10)

            this.clientes[clienteIndex] = cliente;
            console.log(cliente)
            return;
        }

        throw new HttpException(`Cliente com o nome ${cliente.nome} não foi encontrado`, HttpStatus.BAD_REQUEST)
    }

    // Método para remover um cliente pelo ID
    remove(id: string){
        let clienteIndex = this.clientes.findIndex(c => c.id === id);

        if(clienteIndex >= 0){
            this.clientes.splice(clienteIndex, 1);
            return;
        }

        throw new HttpException(`Cliente com o id ${id} não foi encontrado`, HttpStatus.BAD_REQUEST)
    }
}
