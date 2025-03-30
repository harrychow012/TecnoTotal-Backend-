import { Module } from '@nestjs/common';
import { TecnoController } from './controllers/tecno.controller';
import { TecnoService } from './services/tecno.service';

@Module({
  controllers: [TecnoController],
  providers: [TecnoService]
})
export class TecnoModule {}
