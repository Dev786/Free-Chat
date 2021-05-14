import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WebsocketService } from './websocket/websocket.service';
import { Connect } from './websocket/DTO/websocket.dto';

@WebSocketGateway(3001, { transport: 'websocket' })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private websocketService: WebsocketService) {

  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('addClient')
  addClientSocket(@ConnectedSocket() client: Socket, @MessageBody() payload: Connect) {
    this.websocketService.setClientSocket(payload.userId, client);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: Connect) {
    
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    // console.log(client);
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('connection', 'You are connected');
  }
}