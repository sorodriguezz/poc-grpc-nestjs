import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface UsersGrpcClient {
  FindById(data: { id: string }): any;
  CreateUser(data: { name: string; email: string }): any;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private grpcClient: UsersGrpcClient;

  constructor(@Inject('USERS_GRPC') private client: ClientGrpc) {}

  onModuleInit() {
    this.grpcClient = this.client.getService<UsersGrpcClient>('UsersService');
  }

  findById(id: string) {
    return firstValueFrom(this.grpcClient.FindById({ id }));
  }

  createUser(name: string, email: string) {
    return firstValueFrom(this.grpcClient.CreateUser({ name, email }));
  }
}
