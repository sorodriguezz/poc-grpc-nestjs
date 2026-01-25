# 🚀 POC gRPC con NestJS

Proof of Concept de arquitectura de microservicios utilizando gRPC para comunicación entre servicios, NestJS como framework y PostgreSQL como base de datos.

## 🏗️ Arquitectura

```
┌─────────────┐      HTTP/REST     ┌─────────────┐      gRPC       ┌──────────────┐
│   Cliente   │ ─────────────────▶ │   BFF/API   │ ──────────────▶ │ Microservicio│
│  (Postman)  │                    │   Gateway   │                 │     Core     │
└─────────────┘                    │  (nest-bff) │                 │  (nest-core) │
                                   └─────────────┘                 └──────┬───────┘
                                                                           │
                                                                           │ TypeORM
                                                                           ▼
                                                                     ┌─────────────┐
                                                                     │  PostgreSQL │
                                                                     │  Database   │
                                                                     └─────────────┘
```

### Componentes

- **BFF (Backend for Frontend)**: API Gateway que expone endpoints REST y se comunica con microservicios vía gRPC
- **Microservicio Core**: Servicio gRPC que maneja la lógica de negocio y acceso a datos
- **Libs**: Directorio de contratos gRPC compartidos

## 🛠️ Tecnologías

### Backend

- **NestJS** `^11.0.1` - Framework progresivo de Node.js
- **TypeScript** `^5.7.2` - Superset tipado de JavaScript
- **gRPC** `@grpc/grpc-js ^1.14.3` - Framework RPC de alto rendimiento
- **Protocol Buffers** - Serialización de datos

### Base de Datos

- **PostgreSQL** `^8.16.3` - Base de datos relacional
- **TypeORM** `^0.3.28` - ORM para TypeScript

### DevOps

- **Docker** & **Docker Compose** - Contenedorización

## 📁 Estructura del Proyecto

```
poc-grpc-nestjs/
├── libs/              # 📦 Contratos gRPC compartidos
│   └── contracts/
│       └── users/v1/
│           └── users.proto      # Definición del servicio
│
├── nest-bff/                     # 🌐 API Gateway (Puerto 3000)
│   ├── src/
│   │   ├── users/
│   │   │   ├── users.controller.ts   # Endpoints REST
│   │   │   ├── users.service.ts      # Cliente gRPC
│   │   │   └── users.module.ts
│   │   └── main.ts
│   └── package.json
│
├── nest-core/                    # 🔧 Microservicio Core (Puerto 50051)
│   ├── src/
│   │   ├── users/
│   │   │   ├── users.controller.ts   # Controlador gRPC
│   │   │   ├── users.service.ts      # Lógica de negocio
│   │   │   └── entities/
│   │   │       └── user.entity.ts    # Entidad TypeORM
│   │   └── main.ts
│   └── package.json
│
└── deploy/
    └── docker-compose.yml        # PostgreSQL + servicios

```

## 🚀 Instalación

### Prerequisitos

- Node.js >= 18.x
- PostgreSQL >= 14.x (o usar Docker)
- npm >= 9.x

### 1. Clonar repositorio

```bash
git clone <repository-url>
cd poc-grpc-nestjs
```

### 2. Instalar dependencias

```bash
# BFF
cd ../nest-bff
npm install

# Core
cd ../nest-core
npm install
```

### 3. Configurar base de datos

**Opción A: Con Docker**

```bash
cd deploy
docker-compose up -d
```

**Opción B: PostgreSQL local**

Crear base de datos `postgres` y configurar credenciales en `nest-core/src/app.module.ts`

## ▶️ Uso

### Iniciar servicios

**Terminal 1 - Core (gRPC Server)**

```bash
cd nest-core
npm run start:dev
```

✅ Escuchando en `localhost:50051`

**Terminal 2 - BFF (API Gateway)**

```bash
cd nest-bff
npm run start:dev
```

✅ Escuchando en `http://localhost:3000`

## 📡 Endpoints API

### 1. Crear Usuario

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan.perez@example.com"
  }'
```

**Respuesta:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Juan Pérez",
  "email": "juan.perez@example.com"
}
```

### 2. Obtener Usuario por ID

```bash
curl -X GET http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000
```

**Respuesta:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Juan Pérez",
  "email": "juan.perez@example.com"
}
```

### 3. Listar Todos los Usuarios

```bash
curl -X GET http://localhost:3000/users
```

**Respuesta:**

```json
{
  "users": [
    {
      "id": "97493eb5-950e-449c-9bf9-1f7420962ae2",
      "name": "test",
      "email": "test@test.cl"
    },
    {
      "id": "55f2a06b-a0d7-41cd-bac3-599bcbf5ae6b",
      "name": "test",
      "email": "test@test.cl"
    }
  ]
}
```

## 📦 Proto Contracts

### Ubicación

Los contratos gRPC están centralizados en `libs/contracts/users/v1/users.proto`

### Definición del Servicio

```protobuf
syntax = "proto3";

package users;

service UsersService {
  rpc FindById (FindByIdRequest) returns (UserResponse);
  rpc CreateUser (CreateUserRequest) returns (UserResponse);
  rpc FindAllUsers (Empty) returns (UsersResponse);
}

message Empty {}

message FindByIdRequest {
  string id = 1;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
}

message UserResponse {
  string id = 1;
  string name = 2;
  string email = 3;
}

message UsersResponse {
  repeated UserResponse users = 1;
}
```

## 🐳 Docker

```bash
cd deploy
docker-compose up -d
```

Servicios disponibles:

- PostgreSQL: `localhost:5432`
- Usuario: `postgres`
- Password: `postgres`
- Database: `postgres`

### Nest BFF / Nest Core

```bash
npm run start         # Iniciar en modo producción
npm run start:dev     # Iniciar en modo desarrollo
npm run build         # Compilar TypeScript
npm run test          # Ejecutar tests
```

## 🔧 Configuración

### Puertos

| Servicio   | Puerto | Descripción   |
| ---------- | ------ | ------------- |
| BFF        | 3000   | API REST      |
| Core       | 50051  | gRPC Server   |
| PostgreSQL | 5432   | Base de datos |

### Variables de Entorno

Editar en `nest-core/src/app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "grpc_db",
  // ...
});
```

## 📚 Recursos

- [NestJS Documentation](https://docs.nestjs.com/)
- [gRPC Documentation](https://grpc.io/docs/)
- [Protocol Buffers Guide](https://protobuf.dev/)
- [TypeORM Documentation](https://typeorm.io/)

## 📄 Licencia

Este proyecto es un POC (Proof of Concept) para fines educativos.
