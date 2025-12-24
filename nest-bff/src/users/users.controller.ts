import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): any {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() body: { name: string; email: string }): any {
    return this.usersService.createUser(body.name, body.email);
  }

  @Get()
  findAllUsers(): any {
    return this.usersService.findAllUsers();
  }
}
