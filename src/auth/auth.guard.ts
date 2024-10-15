import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string;

  constructor(private readonly jwtService:  JwtService,
    private readonly configService: ConfigService) {
      // Obtém a chave secreta do JWT do arquivo .env
      this.jwtSecret = this.configService.get<string>('JWT_SECRET')
    }

  // Método que determina se a requisição deve ser permitida ou não
  async canActivate(context: ExecutionContext,): Promise<boolean>{
    // Obtém a requisição do contexto
    const request = context.switchToHttp().getRequest();
    // Extrai o token do cabeçalho da requisição
    const token = this.extractTokenFromHeader(request);

    if(!token){
      throw new UnauthorizedException;
    }

    try{
      // Verifica o token e obtém o payload
      const payload = await this.jwtService.verifyAsync(token, {secret: this.jwtSecret})

      // Adiciona o payload à requisição, permitindo acesso ao cliente autenticado
      request['cliente'] = payload;
    } catch {
      throw new UnauthorizedException;
    }

    // Retorna true, permitindo que a requisição prossiga
    return true;
  }

  // Método privado para extrair o token do cabeçalho de autorização
  private extractTokenFromHeader(request: Request): string | undefined {
    // Divide o cabeçalho de autorização em tipo e token
    const [type, token]  = request.headers.authorization.split(' ') ?? [];
    // Retorna o token se o tipo for 'Bearer', caso contrário, retorna undefined
    return type === 'Bearer' ? token: undefined;
  }
}
