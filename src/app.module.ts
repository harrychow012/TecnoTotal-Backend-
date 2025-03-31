import { Module } from '@nestjs/common';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from './modules/clientes/controllers/clientes.controller';

@Module({
  imports: [
    // Cargar variables de entorno
    ConfigModule.forRoot(),
    // Configuración de TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Esto cargará automáticamente las entidades
      synchronize: true,
    }),

    // El módulo de Clientes
    ClientesModule,
  ],
  controllers: [
    ClientesController, // Registrar el controlador en el módulo
  ],
  providers: [],
})
export class AppModule {}
