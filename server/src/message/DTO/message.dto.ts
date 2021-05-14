import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class MessageDTO {

    @IsNotEmpty()
    receiverId: string;

    @IsNotEmpty()
    senderId: string;

    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(1)
    message: string;

}