import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateReparacionDto } from '../dto/reparaciones.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../entities/reparaciones.entity';
import { User } from '../../../auth/entities/auth.entity'; // Asegúrate de importar la entidad User

@Injectable()
export class ReparacionesService {
  constructor(
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Agrega esta línea
  ) {}

  async create(createReparacionDto: CreateReparacionDto) {
    try {
      const reparacion = this.reparacionRepository.create(createReparacionDto);
      console.log('Reparación antes de guardar:', reparacion);
      await this.reparacionRepository.save(reparacion);
      console.log('Reparación después de guardar:', reparacion);
      return reparacion;
    } catch (error) {
      console.error('Error al crear la reparación:', error);
      throw new InternalServerErrorException('Error al crear la reparación');
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const [reparaciones, total] =
        await this.reparacionRepository.findAndCount({
          skip,
          take: limit,
          relations: ['user', 'cliente'], // Incluye la relación con el usuario y cliente
        });

      const totalPages = Math.ceil(total / limit);

      return {
        data: reparaciones, // Devuelve solo los datos
        pagination: {
          total,
          page,
          pageSize: limit,
          totalPages,
        },
      };
    } catch (error) {
      console.error('Error al obtener las reparaciones:', error);
      throw new InternalServerErrorException(
        'Error al obtener las reparaciones',
      );
    }
  }

  async findOne(id: number) {
    try {
      const reparacion = await this.reparacionRepository.findOne({
        where: { id },
      });
      if (!reparacion) {
        throw new NotFoundException(`Reparación con ID ${id} no encontrada`);
      }
      return reparacion;
    } catch (error) {
      console.error('Error al obtener la reparación:', error);
      throw error;
    }
  }

  async update(id: number, updateReparacionDto: Partial<CreateReparacionDto>) {
    try {
      const reparacion = await this.findOne(id);
      Object.assign(reparacion, updateReparacionDto);
      await this.reparacionRepository.save(reparacion);
      return reparacion;
    } catch (error) {
      console.error('Error al actualizar la reparación:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const reparacion = await this.findOne(id);
      await this.reparacionRepository.remove(reparacion);
      return { message: `Reparación con ID ${id} eliminada exitosamente` };
    } catch (error) {
      console.error('Error al eliminar la reparación:', error);
      throw error;
    }
  }

  // Ejemplo usando TypeORM Repository
  async findUserWithRepairs(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['reparaciones'],
      });
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario con reparaciones:', error);
      throw error;
    }
  }
}
