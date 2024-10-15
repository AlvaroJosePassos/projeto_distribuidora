import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';

@Module({
  controllers: [ProdutoController],
  exports: [ProdutoService],
  providers: [ProdutoService]
})
export class ProdutoModule {}
