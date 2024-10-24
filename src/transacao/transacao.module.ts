import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { ProdutoModule } from 'src/produto/produto.module';
import { ClienteModule } from 'src/cliente/cliente.module';
import { TransacaoController } from './transacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacaoEntity } from 'src/db/entities/transacao.entity';

@Module({
  controllers: [TransacaoController],
  providers: [TransacaoService],
  imports: [ProdutoModule, ClienteModule, TypeOrmModule.forFeature([TransacaoEntity])]
})
export class TransacaoModule {}
