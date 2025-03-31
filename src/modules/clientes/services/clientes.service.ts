import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClienteDto } from '../dto/cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      const cliente = this.clienteRepository.create(createClienteDto);
      await this.clienteRepository.save(cliente);

      return cliente;
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      throw new InternalServerErrorException('Error al crear el cliente');
    }
  }
}
