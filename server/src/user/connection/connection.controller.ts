import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Controller('/user/connection')
export class ConnectionController {
    constructor(private connectionService: ConnectionService) {

    }

    @Post('/request/send/:to')
    sendRequest(
        @Body('userId') sender: string,
        @Param('to') receiver: string
    ) {
        return this.connectionService.sendRequest(sender, receiver);
    }

    @Put('/request/accept/:id')
    acceptRequest(@Param('id') connectionId) {
        return this.connectionService.acceptRequest(connectionId);
    }

    @Put('/request/decline/:id')
    accept(@Param('id') connectionId) {
        return this.connectionService.declineRequest(connectionId);
    }

    @Put('/request/cancel/:id')
    decline(@Param('id') connectionId) {
        return this.connectionService.cancelRequest(connectionId);
    }

    @Get('/request/me')
    getConnectionRequestForMe(
        @Query('userId') userId: string,
        @Query('limit') limit: number,
        @Query('page') page: number,
    ) {
        return this.connectionService.getConnetionRequestsForMe(userId, limit, page);
    }

    @Get('/request/sent/me')
    getConnectionRequestISent(
        @Query('userId') userId: string,
        @Query('limit') limit: number,
        @Query('page') page: number,) {
        return this.connectionService.getRequestISent(userId, limit, page);
    }

    @Get('/contacts/me')
    getMyContacts(
        @Query('userId') userId: string
    ) {
        console.log(userId)
        return this.connectionService.getMyContacts(userId);
    }
}
