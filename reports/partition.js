import { Kafka } from 'kafkajs';

var createPartition = async () => {
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

}
createPartition();