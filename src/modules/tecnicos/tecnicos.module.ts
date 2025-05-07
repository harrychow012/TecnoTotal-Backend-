import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tecnico } from './entities/tecnico.entity';
import { TecnicosService } from './services/tecnicos.service';
import { TecnicosController } from './controllers/tecnicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tecnico])],
  controllers: [TecnicosController],
  providers: [TecnicosService],
})
export class TecnicosModule {}
