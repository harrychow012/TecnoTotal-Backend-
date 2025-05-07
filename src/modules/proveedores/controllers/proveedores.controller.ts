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
import { ProveedoresService } from '../services/proveedores.service';
import { CreateProveedorDto } from '../dto/proveedores.dto';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Get()
  getAllProveedores(
    @Query('page') page = 1,
    @Query('limit') limit = 10 // Número de resultados por página
  ) {
    return this.proveedoresService.findAll(Number(page), Number(limit));
  }

  @Post()
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedoresService.create(createProveedorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.proveedoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateProveedorDto>
  ) {
    return this.proveedoresService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.proveedoresService.remove(id);
  }
}
