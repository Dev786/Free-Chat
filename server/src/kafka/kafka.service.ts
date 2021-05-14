import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { ConfigService } from 'src/config';
@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    private kafka: Kafka;
    private producer: Producer;
    private subscribers: { [key: string]: any }
    constructor(
        private configService: ConfigService
    ) {
        this.subscribers = {};
    }

    async sendEventToKafka(payload: Object, topic: string) {
        const producer: any = await this.producer.connect();
        producer.send({
            topic,
            message: JSON.stringify(payload)
        });
    }

    async onModuleInit() {
        this.kafka = new Kafka({
            clientId: this.configService.get("KAFKA_ClIENT_ID"),
            brokers: this.configService.get("KAFKA_BROKERS").split("|")
        });
        this.producer = this.kafka.producer();
    }

    onModuleDestroy() {
        // remove both producer and subscriber
        Logger.log("Destroying Kafka")
    }


    subscribe(topic: string, targetFunc: any) {
        this.subscribers[topic] = targetFunc;
    }
}
