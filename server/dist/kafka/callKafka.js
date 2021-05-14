const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'freeChat',
    brokers: ['localhost:9092']
});
const producer = kafka.producer();
await producer.connect();
await producer.send({
    topic: 'test-topic',
    messages: [
        { value: 'Hello KafkaJS user!' },
    ],
});
await producer.disconnect();
//# sourceMappingURL=callKafka.js.map