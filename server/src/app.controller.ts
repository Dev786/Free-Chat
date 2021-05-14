import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('ping')
  healthCheck(): string {
    const message = "pong"
    return message;
  }
}
