import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from '../dto/cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      const cliente = this.clienteRepository.create(createClienteDto);
      console.log('Cliente antes de guardar:', cliente);
      await this.clienteRepository.save(cliente); // Importante para guardar en la base de datos
      console.log('Cliente después de guardar:', cliente);
      return cliente;
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      throw new InternalServerErrorException('Error al crear el cliente');
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      // Calcular el salto (skip) para la paginación
      const skip = (page - 1) * limit;

      // Obtener los clientes con paginación
      const [clientes, total] = await this.clienteRepository.findAndCount({
        skip, // Número de registros a saltar
        take: limit, // Número de registros por página
      });

      // Calcular el número total de páginas
      const totalPages = Math.ceil(total / limit);

      return {
        data: clientes,
        pagination: {
          total,
          page,
          pageSize: limit,
          totalPages,
        },
      };
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      throw new InternalServerErrorException('Error al obtener los clientes');
    }
  }

  async findOne(clientes_id: number) {
    try {
      const cliente = await this.clienteRepository.findOne({ where: { clientes_id } });
      if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${clientes_id} no encontrado`);
      }
      return cliente;
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
      throw error;
    }
  }

  async update(clientes_id: number, updateClienteDto: Partial<CreateClienteDto>) {
    try {
      const cliente = await this.findOne(clientes_id);
      Object.assign(cliente, updateClienteDto);
      await this.clienteRepository.save(cliente);
      return cliente;
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      throw error;
    }
  }

  async remove(clientes_id: number) {
    try {
      const cliente = await this.findOne(clientes_id);
      await this.clienteRepository.remove(cliente);
      return { message: `Cliente con ID ${clientes_id} eliminado exitosamente` };
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      throw error;
    }
  }
}
