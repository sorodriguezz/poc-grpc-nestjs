import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['users'],
        protoPath: [
          join(__dirname, '../../libs/contracts/users/v1/users.proto'),
        ],
        url: '0.0.0.0:50051',
      },
    },
  );

  await app.listen();
}
void bootstrap();
