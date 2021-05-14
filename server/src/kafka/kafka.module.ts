import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config';
import { KafkaService } from './kafka.service';

@Module({
    imports: [
        ConfigModule
    ],
    providers: [KafkaService],
    exports: [KafkaService]
})
export class KafkaModule { }
