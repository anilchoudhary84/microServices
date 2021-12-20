
import { Kafka } from 'kafkajs';
let allMessages = [];


const createParition = async () => {
    try {
        const kafka = new Kafka({
            clientId: "banking-service-synpulse",
            brokers: ["kafka:9092"]
        });
        const admin = kafka.admin();
        await admin.connect();

        await admin.createTopics({
            topics: [
                {
                    topic: "userTransactions",
                    numPartitions: 1
                }
            ]
        });
        console.log(" 1 partition created");
        await admin.listTopics();
        await admin.disconnect();
    } catch (err) {
        console.log(`consumer error ${JSON.stringify(err)}`)
        throw err;
    }
}
const consumeMessage = async () => {
    try {
        const kafka = new Kafka({
            clientId: "banking-service-synpulse",
            brokers: ["kafka:9092"]
        });
        const consumer = kafka.consumer({ groupId: 'banking' });
        await consumer.connect();
        console.log(`consumer connected **********************`);
        await consumer.subscribe({
            topic: 'userTransactions',
            fromBeginning: true
        });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log("got message obj", JSON.stringify(topic));
                let messageObject = {
                    offset: message.offset,
                    message: JSON.parse(message.value.toString())
                };
                allMessages.push(messageObject);
            }
        });
    } catch (err) {
        console.log(`consumer error ${JSON.stringify(err)}`)
        throw err;
    }
}
const getAllTransaction = async () => {
    return allMessages;
};
export default {
    consumeMessage,
    getAllTransaction,
    createParition


};