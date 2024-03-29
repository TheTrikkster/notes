import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';

@Module({})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
