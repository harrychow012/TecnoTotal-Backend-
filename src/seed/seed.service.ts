import { Injectable } from '@nestjs/common';
import { User } from '../auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { seedUsers } from './seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.insertUsers();
  }

  private async insertUsers() {
    const users = await this.userRepository.find();
    if (users.length > 0) {
      console.log('Seed: Los usuarios ya existen en la base de datos');
      return;
    }

    const hashedUsers = seedUsers.map((user) => ({
      ...user,
      password: user.password, // Ya está hasheada en seed-data.ts
    }));

    await this.userRepository.save(hashedUsers);
    console.log('Seed: Usuarios insertados correctamente');
  }
}
