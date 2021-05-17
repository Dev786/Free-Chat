import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class MessageDTO {

    @IsNotEmpty()
    receiverId: string;

    @IsOptional()
    senderId: string;

    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(1)
    message: string;

}