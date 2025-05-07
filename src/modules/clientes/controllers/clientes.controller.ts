import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, // Importante para manejar los parámetros de la consulta
} from '@nestjs/common';
import { CreateClienteDto } from '../dto/cliente.dto';
import { ClientesService } from '../services/clientes.service';
import { Auth } from '../../../auth/decorators/auth.decorator'; // Importa el decorador de autenticación

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  // Método modificado para soportar paginación
  @Get()
  @Auth()
  getAllClientes(
    @Query('page') page = 1, // Página actual (por defecto es 1)
    @Query('limit') limit = 10, // Número de resultados por página (por defecto es 10)
  ) {
    return this.clientesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientesService.findOne(id);
  }

  @Post()
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Patch(':id')
  updateCliente(
    @Param('id') id: number,
    @Body() updateClienteDto: Partial<CreateClienteDto>,
  ) {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  removeCliente(@Param('id') id: number) {
    return this.clientesService.remove(id);
  }
}
