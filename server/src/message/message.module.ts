import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KafkaModule } from 'src/kafka/kafka.module';
import { Message, MessageSchema } from 'src/Schemas/message.schema';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConfigModule } from 'src/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    AuthModule,
    ConfigModule,
    KafkaModule
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule { }
