import { Module } from '@nestjs/common';
import { TecnoController } from './modules/tecno/controllers/tecno.controller';
import { TecnoService } from './modules/tecno/services/tecno.service';

@Module({
  imports: [],
  controllers: [TecnoController],
  providers: [TecnoService],
})
export class AppModule {}
