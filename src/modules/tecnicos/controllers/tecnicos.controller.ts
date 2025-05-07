import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TecnicosService } from '../services/tecnicos.service';
import { Tecnico } from '../entities/tecnico.entity';

@Controller('tecnicos')
export class TecnicosController {
  constructor(private readonly tecnicosService: TecnicosService) {}

  @Post()
  async create(@Body() tecnicoData: Partial<Tecnico>): Promise<Tecnico> {
    return await this.tecnicosService.create(tecnicoData);
  }

  @Get()
  async findAll(): Promise<Tecnico[]> {
    return await this.tecnicosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tecnico> {
    return await this.tecnicosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Tecnico>
  ): Promise<Tecnico> {
    return await this.tecnicosService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.tecnicosService.remove(id);
  }
}
