import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schemas/user.schema';
import { LoginDTO } from 'src/user/DTO/login.request.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from 'src/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private configService: ConfigService
    ) {

    }

    async validate(loginRequest: LoginDTO): Promise<any> {
        const user = await this.userModel.findOne({
            email: loginRequest.email,
            password: loginRequest.password
        });
        if (user) {
            return user;
        }
        return null;
    }

    async createToken(user: any) {
        return {
            accessToken: jwt.sign({
                userId: user.id,
            }, this.configService.get('JWT_SECRET_KEY'))
        }
    }

    async validateUserId(userId: string) {
        const user = await this.userModel.findOne({
            _id: userId,
        });
        if (user) {
            return true;
        }
        return null;
    }
}
