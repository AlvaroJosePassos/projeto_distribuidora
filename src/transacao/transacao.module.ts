import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { ProdutoModule } from 'src/produto/produto.module';
import { ClienteModule } from 'src/cliente/cliente.module';
import { TransacaoController } from './transacao.controller';

@Module({
  controllers: [TransacaoController],
  providers: [TransacaoService],
  imports: [ProdutoModule, ClienteModule]
})
export class TransacaoModule {}
