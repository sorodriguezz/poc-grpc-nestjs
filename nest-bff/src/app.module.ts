import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_GRPC',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(
            __dirname,
            '../../libs/contracts/users/v1/users.proto',
          ),
          url: 'localhost:50051',
        },
      },
    ]),
    UsersModule,
  ],
})
export class AppModule {}
