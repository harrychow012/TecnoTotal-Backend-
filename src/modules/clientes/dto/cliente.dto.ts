import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsDateString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  address: string;

  @ApiProperty()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
