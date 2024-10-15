import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

@Module({
    controllers: [ClienteController],
    exports: [ClienteService],
    providers: [ClienteService]
})
export class ClienteModule {}
