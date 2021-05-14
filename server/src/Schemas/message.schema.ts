import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PrimaryGeneratedColumn } from "typeorm";
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Prop({
        type: 'string',
        required: true
    })
    senderId: string;

    @Prop({
        type: 'string',
        required: true
    })
    receiverId: string;

    @Prop({
        type: 'string',
        maxlength: 100,
        required: true
    })
    message: string

    @Prop({ type: Date, default: Date.now })
    createdAt: string;

    @Prop({ type: 'string', default: 'UNREAD' })
    status: string
    
}

export const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.index({ senderId: 1 })
MessageSchema.index({ receiverId: 1 })
MessageSchema.index({ createdAt: 1 })