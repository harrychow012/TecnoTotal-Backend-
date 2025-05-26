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
import { ValidRoles } from '../../../auth/interfaces'; // Importa los roles válidos
import { CreateClienteDto } from '../dto/cliente.dto';
import { ClientesService } from '../services/clientes.service';
import { Auth } from '../../../auth/decorators/auth.decorator'; // Importa el decorador de autenticación

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  // Método modificado para soportar paginación
  @Get()
  @Auth(ValidRoles.admin)
  getAllClientes(
    @Query('page') page = 1, // Página actual (por defecto es 1)
    @Query('limit') limit = 10, // Número de resultados por página (por defecto es 10)
  ) {
    return this.clientesService.findAll(Number(page), Number(limit));
  }

  @Get(':clientes_id')
  findOne(@Param('clientes_id') clientes_id: number) {
    return this.clientesService.findOne(Number(clientes_id));
  }

  @Post()
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Patch(':clientes_id')
  updateCliente(
    @Param('clientes_id') clientes_id: number,
    @Body() updateClienteDto: Partial<CreateClienteDto>,
  ) {
    return this.clientesService.update(Number(clientes_id), updateClienteDto);
  }

  @Delete(':clientes_id')
  removeCliente(@Param('clientes_id') clientes_id: number) {
    return this.clientesService.remove(Number(clientes_id));
  }
}
