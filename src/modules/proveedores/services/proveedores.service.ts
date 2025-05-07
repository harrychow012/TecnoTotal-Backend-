import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from '../entities/proveedores.entity';
import { CreateProveedorDto } from '../dto/proveedores.dto';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>
  ) {}

  async create(createProveedorDto: CreateProveedorDto) {
    try {
      const proveedor = this.proveedorRepository.create(createProveedorDto);
      await this.proveedorRepository.save(proveedor);
      return proveedor;
    } catch (error) {
      console.error('Error al crear el proveedor:', error);
      throw new InternalServerErrorException('Error al crear el proveedor');
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const [proveedores, total] = await this.proveedorRepository.findAndCount({
        skip,
        take: limit,
      });

      const totalPages = Math.ceil(total / limit);

      return {
        data: proveedores,
        pagination: {
          total,
          page,
          pageSize: limit,
          totalPages,
        },
      };
    } catch (error) {
      console.error('Error al obtener los proveedores:', error);
      throw new InternalServerErrorException(
        'Error al obtener los proveedores'
      );
    }
  }

  async findOne(id: number) {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: { id },
      });
      if (!proveedor) {
        throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
      }
      return proveedor;
    } catch (error) {
      console.error('Error al obtener el proveedor:', error);
      throw error;
    }
  }

  async update(id: number, updateData: Partial<CreateProveedorDto>) {
    try {
      const proveedor = await this.findOne(id);
      Object.assign(proveedor, updateData);
      await this.proveedorRepository.save(proveedor);
      return proveedor;
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const proveedor = await this.findOne(id);
      await this.proveedorRepository.remove(proveedor);
      return { message: `Proveedor con ID ${id} eliminado exitosamente` };
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
      throw error;
    }
  }
}
