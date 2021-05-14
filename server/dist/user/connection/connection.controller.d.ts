/// <reference types="mongoose" />
import { ConnectionService } from './connection.service';
export declare class ConnectionController {
    private connectionService;
    constructor(connectionService: ConnectionService);
    sendRequest(sender: string, receiver: string): Promise<{
        success: boolean;
        data: Document & import("../../Schemas/connection.schema").Connection & import("mongoose").Document<any, any>;
    }>;
    acceptRequest(connectionId: any): Promise<{
        success: boolean;
        data: import("mongoose").UpdateWriteOpResult;
    }>;
    accept(connectionId: any): Promise<{
        success: boolean;
        data: import("mongoose").UpdateWriteOpResult;
    }>;
    decline(connectionId: any): Promise<{
        success: boolean;
        data: import("mongoose").UpdateWriteOpResult;
    }>;
    getConnectionRequestForMe(userId: string, limit: number, page: number): Promise<{
        success: boolean;
        data: (Document & import("../../Schemas/connection.schema").Connection & import("mongoose").Document<any, any>)[];
    }>;
    getConnectionRequestISent(userId: string, limit: number, page: number): Promise<{
        success: boolean;
        data: (Document & import("../../Schemas/connection.schema").Connection & import("mongoose").Document<any, any>)[];
    }>;
    getMyContacts(userId: string): Promise<{
        success: boolean;
        data: {
            username: string;
            id: any;
            firstName: string;
            lastName: string;
        }[];
    }>;
}
