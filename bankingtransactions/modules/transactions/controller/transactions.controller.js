import TransactionService from '../service/transactions.service.js';
import ProducerService from '../service/producer.js'

import { Kafka } from 'kafkajs';
class TransactionEntryController {
    static async insertTransactions(req, res) {

        try {
            // await ConsumerService.consumeMessage();
            const result = await TransactionService.createTransaction(req.body);
            await ProducerService.sendMessage(result);
            res.status(200).json(result);
        } catch (err) {
            console.log("here is error")
            res.status(404).send({ message: err.toString() });
        }

        // res.status(200).send({ message: "Success response", type: "Success" });
    }
}

export default TransactionEntryController;

