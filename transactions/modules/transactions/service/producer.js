import { Kafka } from 'kafkajs';


const sendMessage = async (data) => {
    try {
        const kafka = new Kafka({
            clientId: "banking-service-synpulse",
            brokers: ["kafka:9092"]
        });
        const producer = kafka.producer();
        await producer.connect()
        await producer.send({
            topic: "userTransactions",
            messages: [
                {
                    value: JSON.stringify(data),
                    partition: 0
                }
            ]
        });
        console.log(`sent the data`);
        await producer.disconnect()
        return;
    } catch (err) {

        console.log(`produce error ${JSON.stringify(err)}`)
        throw err;
    }
}

// sendMessage()
export default {
    sendMessage


};
