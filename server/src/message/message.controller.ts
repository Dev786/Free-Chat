import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessageDTO } from './DTO/message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Get('history')
    getHistory(
        @Query('userId') senderId: string,
        @Query('receiverId') receiverId: string,
        @Query('limit') limit: number,
        @Query('offset') page: number
    ) {
        return this.messageService.getHistory(senderId, receiverId, limit, page);
    }


    @Post('send')
    sendMessage(
        @Body() messageBody: MessageDTO,
        @Body('userId') senderId: string
    ) {
        messageBody.senderId = senderId;
        return this.messageService.saveMessage(messageBody);
    }
}
