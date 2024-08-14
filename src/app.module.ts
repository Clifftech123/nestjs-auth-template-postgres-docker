import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HashModule } from './hashing/hashing.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, HashModule,  ConfigModule.forRoot(), AuthModule, TodoModule, UsersModule],
  
})
export class AppModule {}
