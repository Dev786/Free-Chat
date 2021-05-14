import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NestModule } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { gatewayMiddleware } from './auth/gateway.middleware';
import { MessageModule } from './message/message.module';
import { AppGateway } from './app.gateway';
import { KafkaModule } from './kafka/kafka.module';
import { WebsocketModule } from './websocket/websocket.module';
import { ConnectionController } from './user/connection/connection.controller';

@Module({
  imports: [
    ConfigModule,
    WebsocketModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MessageModule,
    KafkaModule
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(gatewayMiddleware)
      .exclude(
        { path: '/user/login', method: RequestMethod.POST },
        { path: '/user/register', method: RequestMethod.POST }
      )
      .forRoutes(UserController, ConnectionController)
      .apply()
  }
}
