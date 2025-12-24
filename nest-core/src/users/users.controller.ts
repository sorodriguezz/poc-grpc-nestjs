import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @GrpcMethod('UsersService', 'FindById')
  findById(data: { id: string }) {
    console.log(data);
    return this.service.findById(data.id);
  }

  @GrpcMethod('UsersService', 'CreateUser')
  createUser({ name, email }: CreateUserDto) {
    return this.service.create(name, email);
  }
}
