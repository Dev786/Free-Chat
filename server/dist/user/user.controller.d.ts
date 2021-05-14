import { RegisterDTO, LoginDTO } from './DTO/login.request.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
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
    logout(userId: any): Promise<{
        success: boolean;
        data: string;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    register(request: RegisterDTO): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message: Promise<{
            accessToken: string;
        }>;
    }>;
    login(request: LoginDTO): Promise<{
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
}
