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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("../config");
const message_schema_1 = require("../Schemas/message.schema");
const kafkajs_1 = require("kafkajs");
const auth_service_1 = require("../auth/auth.service");
let MessageService = class MessageService {
    constructor(configService, authService) {
        this.configService = configService;
        this.authService = authService;
        this.MESSAGE_TOPIC = this.configService.get('KAFKA_FREE_CHAT_SAVE_MESSAGE_TOPIC');
    }
    async onModuleInit() {
        this.kafka = new kafkajs_1.Kafka({
            clientId: this.configService.get("KAFKA_ClIENT_ID"),
            brokers: this.configService.get("KAFKA_BROKERS").split("|")
        });
        this.consumer = this.kafka.consumer({ groupId: this.configService.get("KAFKA_FREE_CHAT_GROUP_ID") });
        await this.consumer.connect();
        this.consumer.subscribe({
            topic: this.configService.get('KAFKA_FREE_CHAT_SAVE_MESSAGE_TOPIC')
        });
        this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                common_1.Logger.log(`${topic} --> ${partition} --> ${message.value.toString()}`);
                this.saveMessage(JSON.parse(message.value.toString()));
            }
        });
    }
    async saveMessage(message) {
        const [isValidSender, isValidReceiver] = await Promise.all([
            this.authService.validateUserId(message.senderId),
            this.authService.validateUserId(message.receiverId)
        ]);
        if (isValidSender && isValidReceiver) {
            const response = this.messageModel.create(message);
        }
    }
    async getHistory(senderId, receiverId, limit, page) {
        limit = limit > 0 ? limit : 10;
        page = page > 0 ? page : 1;
        const offset = (page - 1) * limit;
        return {
            success: true,
            data: await this.messageModel.find({
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            }).sort({ createdAt: 'desc' })
        };
    }
};
__decorate([
    mongoose_1.InjectModel(message_schema_1.Message.name),
    __metadata("design:type", mongoose_2.Model)
], MessageService.prototype, "messageModel", void 0);
MessageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map