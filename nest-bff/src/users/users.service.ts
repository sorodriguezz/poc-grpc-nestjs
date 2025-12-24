import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

interface UsersGrpcClient {
  FindById(data: { id: string }): Observable<any>;
  CreateUser(data: { name: string; email: string }): Observable<any>;
  FindAllUsers(data: any): Observable<any>;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private grpcClient: UsersGrpcClient;

  constructor(@Inject('USERS_GRPC') private client: ClientGrpc) {}

  onModuleInit() {
    this.grpcClient = this.client.getService<UsersGrpcClient>('UsersService');
  }

  async findById(id: string): Promise<any> {
    return firstValueFrom(this.grpcClient.FindById({ id }));
  }

  async createUser(name: string, email: string): Promise<any> {
    return firstValueFrom(this.grpcClient.CreateUser({ name, email }));
  }

  async findAllUsers(): Promise<any> {
    return firstValueFrom(this.grpcClient.FindAllUsers({}));
  }
}
