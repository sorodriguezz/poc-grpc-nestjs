import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_GRPC',
        transport: Transport.GRPC,
        options: {
          package: ['users'],
          protoPath: [
            join(__dirname, '../../../libs/contracts/users/v1/users.proto'),
          ],
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
