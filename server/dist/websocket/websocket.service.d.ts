import { Socket } from 'socket.io';
export declare class WebsocketService {
    private clientsSocket;
    constructor();
    setClientSocket(clientId: string, socket: Socket): void;
    removeClientSocket(clientId: string): void;
    getClientSocket(clientId: string): Socket;
}
