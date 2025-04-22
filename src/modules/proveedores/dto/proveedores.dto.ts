import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsEmail()
  @Length(1, 150)
  email: string;

  @IsString()
  @Length(1, 15)
  telefono: string;

  @IsString()
  @Length(1, 255)
  direccion: string;

  @IsOptional()
  @IsString()
  productos?: string;
}
