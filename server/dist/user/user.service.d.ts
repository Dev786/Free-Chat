import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserDocument } from 'src/Schemas/user.schema';
import { LoginDTO, RegisterDTO } from './DTO/login.request.dto';
export declare class UserService {
    private userModel;
    private authService;
    constructor(userModel: Model<UserDocument>, authService: AuthService);
    register(registerRequest: RegisterDTO): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message: Promise<{
            accessToken: string;
        }>;
    }>;
    login(loginRequest: LoginDTO): Promise<{
        success: boolean;
        data: {
            accessToken: string;
        };
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    logout(userId: string): Promise<{
        success: boolean;
        data: string;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    getUser(userId: string): Promise<{
        success: boolean;
        data: {
            email: string;
            firstName: string;
            lastName: string;
            username: string;
        };
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
}
