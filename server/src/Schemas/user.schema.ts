import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PrimaryGeneratedColumn } from "typeorm";
export type UserDocument = User & Document;

@Schema()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Prop({
        type: 'string'
    })
    username: string

    @Prop({
        type: 'string'
    })
    firstName: string

    @Prop({
        type: 'string'
    })
    lastName: string

    @Prop({
        type: 'string'
    })
    email: string

    @Prop({
        minlength: 6,
        type: 'string'
    })
    password: string


    @Prop({ type: Boolean, default: false })
    online: Boolean

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 })
UserSchema.index({ email: 1 })