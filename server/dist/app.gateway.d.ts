import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WebsocketService } from './websocket/websocket.service';
import { Connect } from './websocket/DTO/websocket.dto';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private websocketService;
    constructor(websocketService: WebsocketService);
    server: Server;
    private logger;
    addClientSocket(client: Socket, payload: Connect): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
