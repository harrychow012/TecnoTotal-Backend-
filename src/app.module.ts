import { Module } from '@nestjs/common';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from './modules/clientes/controllers/clientes.controller';
import { TecnicosModule } from './modules/tecnicos/tecnicos.module';
import { TecnicosService } from './modules/tecnicos/services/tecnicos.service';
import { TecnicosController } from './modules/tecnicos/controllers/tecnicos.controller';
import { Tecnico } from './modules/tecnicos/entities/tecnico.entity';

@Module({
  imports: [
    // Cargar variables de entorno
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    // El módulo de Clientes
    ClientesModule,

    TecnicosModule,
    TypeOrmModule.forFeature([Tecnico]),
  ],
  controllers: [
    ClientesController, // Registrar el controlador en el módulo
    TecnicosController,
  ],
  providers: [
    TecnicosService,
  ],
})
export class AppModule {}
