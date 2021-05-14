import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { User, UserDocument } from 'src/Schemas/user.schema';
import { LoginDTO, RegisterDTO } from './DTO/login.request.dto';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private authService: AuthService
    ) { }

    async register(registerRequest: RegisterDTO) {
        console.log(registerRequest);
        const emailExist = await this.userModel.findOne({ email: registerRequest.email })
        const usernameExist = await this.userModel.findOne({ username: registerRequest.username })
        if (emailExist || usernameExist) {
            return {
                success: false,
                message: emailExist ? "Email Already Exists" : 'Username already Exists'
            }
        }
        registerRequest.password = crypto.createHmac('sha256', registerRequest.password).digest('hex');
        this.userModel.create(registerRequest);
        return {
            success: true,
            message: this.authService.createToken({ email: registerRequest.email, password: registerRequest.password })
        }

    }

    async login(loginRequest: LoginDTO) {
        const user = await this.authService.validate(loginRequest);
        console.log(user);
        if (user) {
            this.userModel.updateOne({ email: loginRequest.email }, { online: true })
            return {
                success: true,
                data: {
                    userId: user.id,
                    accessToken: await this.authService.createToken(user)
                }
            };
        }
        return {
            success: false,
            message: "User Does not Exist"
        }
    }


    async logout(userId: string) {
        const update = this.userModel.updateOne({ userId: userId }, { online: false })
        if (update) {
            return {
                success: true,
                data: "Logout Successful"
            };
        }
        return {
            success: false,
            message: "Couldn't logout"
        }
    }

    async getUser(userId: string) {
        const user = await this.userModel.findOne({ id: userId });
        if (user) {
            return {
                success: true,
                data: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username
                }
            }
        }
        return {
            success: false,
            message: 'User Does Not Exists'
        }
    }
}
