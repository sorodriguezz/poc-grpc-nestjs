import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findById(id: string) {
    return this.repo.findOneBy({ id });
  }

  create(name: string, email: string) {
    const user = this.repo.create({ name, email });
    return this.repo.save(user);
  }

  async findAllUsers() {
    const users = await this.repo.find();
    return { users };
  }
}
