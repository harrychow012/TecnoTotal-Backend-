import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tecnico } from '../entities/tecnico.entity';

@Injectable()
export class TecnicosService {
  constructor(
    @InjectRepository(Tecnico)
    private readonly tecnicoRepository: Repository<Tecnico>
  ) {}

  async create(tecnicoData: Partial<Tecnico>): Promise<Tecnico> {
    const tecnico = this.tecnicoRepository.create(tecnicoData);
    return await this.tecnicoRepository.save(tecnico);
  }

  async findAll(): Promise<Tecnico[]> {
    return await this.tecnicoRepository.find();
  }

  async findOne(id: number): Promise<Tecnico> {
    const tecnico = await this.tecnicoRepository.findOne({ where: { id } });
    if (!tecnico) {
      throw new NotFoundException(`Técnico con ID ${id} no encontrado`);
    }
    return tecnico;
  }

  async update(id: number, updateData: Partial<Tecnico>): Promise<Tecnico> {
    await this.tecnicoRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const tecnico = await this.findOne(id);
    await this.tecnicoRepository.delete(tecnico.id);
  }
}
