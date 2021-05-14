import { Document } from 'mongoose';
export declare type MessageDocument = Message & Document;
export declare class Message {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
    status: string;
}
export declare const MessageSchema: import("mongoose").Schema<Document<Message, any>, import("mongoose").Model<any, any, any>, undefined>;
