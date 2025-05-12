import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReparacionesService } from './services/reparaciones.service';
import { Reparacion } from './entities/reparaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reparacion])],
  providers: [ReparacionesService],
  exports: [ReparacionesService], // Exporta el servicio para que otros módulos puedan usarlo
})
export class ReparacionesModule {}
