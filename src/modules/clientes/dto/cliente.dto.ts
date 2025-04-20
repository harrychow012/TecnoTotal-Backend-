import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @Length(3, 100)
  nombre: string;

  @IsString()
  @Length(3, 100)
  email: string;

  @IsString()
  @Length(5, 15)
  phoneNumber: string;

  @IsString()
  @Length(3, 255)
  address: string;

  @IsDateString()
  dateOfBirth: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}
