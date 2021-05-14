import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getHistory(senderId: string, receiverId: string, limit: number, page: number): Promise<{
        success: boolean;
        data: import("../Schemas/message.schema").MessageDocument[];
    }>;
}
