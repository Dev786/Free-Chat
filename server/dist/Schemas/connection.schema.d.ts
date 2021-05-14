/// <reference types="mongoose" />
export declare type ConnectionDocument = Document & Connection;
export declare class Connection {
    id: string;
    from: string;
    to: string;
    createdAt: Date;
    status: string;
}
export declare const ConnectionSchema: import("mongoose").Schema<import("mongoose").Document<Connection, any>, import("mongoose").Model<any, any, any>, undefined>;
