import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateClienteDto } from '../dto/cliente.dto';
import { ClientesService } from '../services/clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  getAllClientes() {
    return 'Lista de todos los clientes';
  }

  @Post()
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }
}
