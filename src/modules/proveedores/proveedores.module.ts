import { Module } from '@nestjs/common';
import { ProveedoresController } from './controllers/proveedores.controller';
import { ProveedoresService } from './services/proveedores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor])],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
})
export class ProveedoresModule {}
