import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from 'src/config';
export declare class KafkaService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private kafka;
    private producer;
    private subscribers;
    constructor(configService: ConfigService);
    sendEventToKafka(payload: Object, topic: string): Promise<void>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
    subscribe(topic: string, targetFunc: any): void;
}
