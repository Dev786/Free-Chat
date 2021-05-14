import { Model } from 'mongoose';
import { ConfigService } from 'src/config';
import { MessageDocument } from 'src/Schemas/message.schema';
import { MessageDTO } from './DTO/message.dto';
import { Consumer, Kafka } from 'kafkajs';
import { AuthService } from 'src/auth/auth.service';
export declare class MessageService {
    private configService;
    private authService;
    MESSAGE_TOPIC: string;
    kafka: Kafka;
    consumer: Consumer;
    messageModel: Model<MessageDocument>;
    constructor(configService: ConfigService, authService: AuthService);
    onModuleInit(): Promise<void>;
    saveMessage(message: MessageDTO): Promise<void>;
    getHistory(senderId: string, receiverId: string, limit: number, page: number): Promise<{
        success: boolean;
        data: MessageDocument[];
    }>;
}
