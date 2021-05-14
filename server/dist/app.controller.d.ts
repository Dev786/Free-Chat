import { ConfigService } from './config/config.service';
export declare class AppController {
    private readonly configService;
    constructor(configService: ConfigService);
    healthCheck(): string;
}
