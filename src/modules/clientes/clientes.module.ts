import { Module } from '@nestjs/common';
import { ClientesController } from './controllers/clientes.controller';
import { ClientesController } from './controllers/clientes.controller';

@Module({
  controllers: [ClientesController]
})
export class ClientesModule {}
