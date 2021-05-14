"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'freeChat',
    brokers: ['localhost:9092']
});
async function sendMessage() {
    const producer = kafka.producer();
    const producerConnect = await producer.connect();
    producerConnect.send({
        topic: 'freeChatTopic',
        message: JSON.stringify({ userId: 'bitch' })
    });
}
sendMessage();
//# sourceMappingURL=kafka.test.js.map