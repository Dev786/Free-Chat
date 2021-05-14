import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ConnectionEnum } from "src/Enums/connection.enum";
import { PrimaryGeneratedColumn } from "typeorm";

export type ConnectionDocument = Document & Connection;

@Schema()
export class Connection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Prop({
        type: "string"
    })
    from: string;

    @Prop({
        type: "string"
    })
    to: string;

    @Prop({
        type: Date,
        default: Date.now
    })
    createdAt: Date

    @Prop({
        type: ConnectionEnum,
        default: "PENDING"
    })
    status: string
}


export const ConnectionSchema = SchemaFactory.createForClass(Connection);
ConnectionSchema.index({ from: 1, to: 1 }, { unique: true })
ConnectionSchema.index({ createdAt: 1 })
ConnectionSchema.index({ from: 1 })
ConnectionSchema.index({ to: 1 })
ConnectionSchema.index({ type: 1 })