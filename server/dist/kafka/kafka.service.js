"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
const config_1 = require("../config");
let KafkaService = class KafkaService {
    constructor(configService) {
        this.configService = configService;
        this.subscribers = {};
    }
    async sendEventToKafka(payload, topic) {
        const producer = await this.producer.connect();
        producer.send({
            topic,
            message: JSON.stringify(payload)
        });
    }
    async onModuleInit() {
        this.kafka = new kafkajs_1.Kafka({
            clientId: this.configService.get("KAFKA_ClIENT_ID"),
            brokers: this.configService.get("KAFKA_BROKERS").split("|")
        });
        this.producer = this.kafka.producer();
    }
    onModuleDestroy() {
        common_1.Logger.log("Destroying Kafka");
    }
    subscribe(topic, targetFunc) {
        this.subscribers[topic] = targetFunc;
    }
};
KafkaService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], KafkaService);
exports.KafkaService = KafkaService;
//# sourceMappingURL=kafka.service.js.map