import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../entities/reparaciones.entity';
import { CreateReparacionDto } from '../dto/reparaciones.dto';
import { InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class ReparacionesService {
  constructor(
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
  ) {}

  async create(createReparacionDto: CreateReparacionDto) {
    const nuevaReparacion =
      this.reparacionRepository.create(createReparacionDto);
    return await this.reparacionRepository.save(nuevaReparacion);
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      // Calcular el salto (skip) para la paginación
      const skip = (page - 1) * limit;

      // Obtener los clientes con paginación
      const [clientes, total] = await this.reparacionRepository.findAndCount({
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

  async findOne(id: number) {
    const reparacion = await this.reparacionRepository.findOne({
      where: { id },
    });
    if (!reparacion) {
      throw new NotFoundException(`Reparación con ID ${id} no encontrada`);
    }
    return reparacion;
  }

  async update(id: number, updateData: Partial<CreateReparacionDto>) {
    const reparacion = await this.findOne(id);
    Object.assign(reparacion, updateData);
    return await this.reparacionRepository.save(reparacion);
  }

  async remove(id: number) {
    const reparacion = await this.findOne(id);
    await this.reparacionRepository.remove(reparacion);
    return { message: `Reparación con ID ${id} eliminada exitosamente` };
  }
}
