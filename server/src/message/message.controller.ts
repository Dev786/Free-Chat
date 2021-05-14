import { Controller, Get, Query } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Get('history')
    getHistory(
        @Query('senderId') senderId: string,
        @Query('receiverId') receiverId: string,
        @Query('limit') limit: number,
        @Query('offset') page: number
    ) {
        return this.messageService.getHistory(senderId, receiverId, limit, page);
    }
}
