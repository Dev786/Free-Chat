import { Model } from 'mongoose';
import { Connection, ConnectionDocument } from 'src/Schemas/connection.schema';
import { UserDocument } from 'src/Schemas/user.schema';
export declare class ConnectionService {
    private readonly connectionModel;
    private readonly userModel;
    constructor(connectionModel: Model<ConnectionDocument>, userModel: Model<UserDocument>);
    sendRequest(from: string, to: string): Promise<{
        success: boolean;
        data: Document & Connection & import("mongoose").Document<any, any>;
    }>;
    cancelRequest(connectionId: string): Promise<{
        success: boolean;
        data: import("mongoose").UpdateWriteOpResult;
    }>;
    acceptRequest(connectionId: string): Promise<{
        success: boolean;
        data: import("mongoose").UpdateWriteOpResult;
    }>;
    declineRequest(connectionId: string): Promise<{
        success: boolean;
        data: import("mongoose").UpdateWriteOpResult;
    }>;
    getConnetionRequestsForMe(userId: string, limit: number, page: number): Promise<{
        success: boolean;
        data: (Document & Connection & import("mongoose").Document<any, any>)[];
    }>;
    getRequestISent(userId: string, limit: number, page: number): Promise<{
        success: boolean;
        data: (Document & Connection & import("mongoose").Document<any, any>)[];
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
