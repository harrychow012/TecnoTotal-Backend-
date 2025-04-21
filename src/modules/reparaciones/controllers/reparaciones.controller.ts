import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ReparacionesService } from '../services/reparaciones.service';
import { CreateReparacionDto } from '../dto/reparaciones.dto';

@Controller('reparaciones')
export class ReparacionesController {
  constructor(private readonly reparacionesService: ReparacionesService) {}

  @Get()
  getAllClientes(
    @Query('page') page = 1, // Página actual (por defecto es 1)
    @Query('limit') limit = 10, // Número de resultados por página (por defecto es 10)
  ) {
    return this.reparacionesService.findAll(Number(page), Number(limit));
  }

  @Post()
  create(@Body() createReparacionDto: CreateReparacionDto) {
    return this.reparacionesService.create(createReparacionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reparacionesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateReparacionDto>,
  ) {
    return this.reparacionesService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reparacionesService.remove(id);
  }
}
