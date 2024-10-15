import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { TransacaoModule } from './transacao/transacao.module';
import { ProdutoModule } from './produto/produto.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    ClienteModule, TransacaoModule, ProdutoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
