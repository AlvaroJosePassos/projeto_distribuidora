import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from '../db/entities/cliente.entity';

@Module({
    controllers: [ClienteController],
    imports: [TypeOrmModule.forFeature([ClienteEntity])],
    exports: [ClienteService],
    providers: [ClienteService]
})
export class ClienteModule {}
