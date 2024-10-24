import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/db/entities/produto.entity';

@Module({
  controllers: [ProdutoController],
  exports: [ProdutoService],
  providers: [ProdutoService],
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
})
export class ProdutoModule {}
