import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)  // Define o código de status HTTP a ser retornado
    @Post('login')
    singIn(
        // Extrai o email e a senha do corpo da requisição
        @Body('email') email: string, 
        @Body('senha') senha: string
    ): AuthResponseDto {
        // Chama o método de login do serviço de autenticação e retorna a resposta
        return this.authService.singIn(email, senha);
    }
}
