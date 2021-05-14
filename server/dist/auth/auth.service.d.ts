import { Model } from 'mongoose';
import { UserDocument } from 'src/Schemas/user.schema';
import { LoginDTO } from 'src/user/DTO/login.request.dto';
import { ConfigService } from 'src/config';
export declare class AuthService {
    private userModel;
    private configService;
    constructor(userModel: Model<UserDocument>, configService: ConfigService);
    validate(loginRequest: LoginDTO): Promise<any>;
    createToken(user: any): Promise<{
        accessToken: string;
    }>;
    validateUserId(userId: string): Promise<boolean>;
}
