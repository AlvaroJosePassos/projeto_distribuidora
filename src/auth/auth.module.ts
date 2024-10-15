import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [JwtModule.registerAsync({
    global: true, // Torna o módulo JWT acessível globalmente em toda a aplicação
    imports: [],
    useFactory: async (configService: ConfigService) => ({
      // Obtém a chave secreta do JWT do arquivo .env
      secret: configService.get<string>('JWT_SECRET'),
      // Define as opções de expiração do token a partir da informação contida no arquivo .env
      signOptions: {expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME')}
    }),
    inject: [ConfigService]
  }), ClienteModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
