import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @Length(3, 100)
  Nombre: string;

  @IsString()
  @Length(5, 15)
  Telefono: string;

  @IsString()
  @Length(3, 255)
  Direccion: string;

  @IsEmail()
  @Length(3, 100)
  Email: string;

  @IsString()
  @IsOptional()
  Historial_compras?: string;

  @IsString()
  @IsOptional()
  Historial_reparaciones?: string;
}
