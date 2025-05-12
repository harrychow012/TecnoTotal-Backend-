import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { ReparacionesModule } from '../modules/reparaciones/reparaciones.module';

@Module({
  imports: [ReparacionesModule], // Importa el módulo de reparaciones
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
