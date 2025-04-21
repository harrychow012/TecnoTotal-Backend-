import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reparacion } from './entities/reparaciones.entity';
import { ReparacionesService } from './services/reparaciones.service';
import { ReparacionesController } from './controllers/reparaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reparacion])],
  providers: [ReparacionesService],
  controllers: [ReparacionesController],
})
export class ReparacionesModule {}
