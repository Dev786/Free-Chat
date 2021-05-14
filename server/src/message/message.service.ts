import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from 'src/config';
import { Message, MessageDocument } from 'src/Schemas/message.schema';
import { MessageDTO } from './DTO/message.dto';
import { Consumer, Kafka } from 'kafkajs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MessageService {
    MESSAGE_TOPIC: string;
    kafka: Kafka;
    consumer: Consumer;
    @InjectModel(Message.name) messageModel: Model<MessageDocument>
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        this.MESSAGE_TOPIC = this.configService.get('KAFKA_FREE_CHAT_SAVE_MESSAGE_TOPIC');
    }

    async onModuleInit() {
        // Initialize a message consumer
        this.kafka = new Kafka({
            clientId: this.configService.get("KAFKA_ClIENT_ID"),
            brokers: this.configService.get("KAFKA_BROKERS").split("|")
        });
        this.consumer = this.kafka.consumer({ groupId: this.configService.get("KAFKA_FREE_CHAT_GROUP_ID") });
        await this.consumer.connect()
        this.consumer.subscribe({
            topic: this.configService.get('KAFKA_FREE_CHAT_SAVE_MESSAGE_TOPIC')
        });

        this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                Logger.log(`${topic} --> ${partition} --> ${message.value.toString()}`);
                this.saveMessage(JSON.parse(message.value.toString()));
            }
        });
    }

    async saveMessage(message: MessageDTO) {
        const [isValidSender, isValidReceiver] = await Promise.all([
            this.authService.validateUserId(message.senderId),
            this.authService.validateUserId(message.receiverId)
        ]);
        console.log("message: ", message)
        console.log("isValidSender: ", isValidSender, " isValidReceiver: ", isValidReceiver)
        if (isValidSender && isValidReceiver) {
            const response = this.messageModel.create(message);
            return {
                success: true,
                data: response
            }
        }

        return {
            success: false
        }
    }


    async getHistory(senderId: string, receiverId: string, limit: number, page: number) {
        limit = limit > 0 ? limit : 10;
        page = page > 0 ? page : 1;
        const offset = (page - 1) * limit;
        return {
            success: true,
            data: await this.messageModel.find(
                {
                    $or: [
                        { senderId, receiverId },
                        { senderId: receiverId, receiverId: senderId }
                    ]
                }
            ).sort({ createdAt: 'desc' })
        }
    }
}
