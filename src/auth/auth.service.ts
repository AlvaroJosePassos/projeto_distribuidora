import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClienteService } from 'src/cliente/cliente.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;
    
    constructor(
        private readonly clienteService: ClienteService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        // Obtém o tempo de expiração do JWT do arquivo .env
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME')
    }

    // Método para realizar o login do cliente
    singIn(email: string, senha: string): AuthResponseDto {
        const foundCliente = this.clienteService.findByEmail(email);

        if(!foundCliente || !bcryptCompareSync(senha, foundCliente.senha)){
            throw new UnauthorizedException();
        }

        const payload = { sub: foundCliente.id, email: foundCliente.email};

        const token = this.jwtService.sign(payload);

        return {token, expiresIn: this.jwtExpirationTimeInSeconds}
    }

}
