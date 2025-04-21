import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateReparacionDto {
  @IsString()
  nombreCliente: string;

  @IsString()
  equipo: string;

  @IsString()
  descripcionFalla: string;

  @IsString()
  estado: string;

  @IsOptional()
  @IsString()
  tecnicoAsignado?: string;

  @IsDateString()
  fechaIngreso: string;

  @IsOptional()
  @IsDateString()
  fechaEntrega?: string;
}
