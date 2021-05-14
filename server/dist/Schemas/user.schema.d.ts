/// <reference types="mongoose" />
export declare type UserDocument = User & Document;
export declare class User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    online: Boolean;
}
export declare const UserSchema: import("mongoose").Schema<import("mongoose").Document<User, any>, import("mongoose").Model<any, any, any>, undefined>;
