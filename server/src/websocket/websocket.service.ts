import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class WebsocketService {
    private clientsSocket: { [key: string]: Socket }
    constructor() {
        this.clientsSocket = {};
    }

    setClientSocket(clientId: string, socket: Socket) {
        console.log(clientId, socket);
        this.clientsSocket[clientId] = socket;
    }

    removeClientSocket(clientId: string) {
        delete this.clientsSocket[clientId];
    }

    getClientSocket(clientId: string) {
        return this.clientsSocket[clientId];
    }
}
