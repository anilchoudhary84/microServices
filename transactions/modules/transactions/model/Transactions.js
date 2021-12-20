
import mongoose from 'mongoose'

import { v4 as uuid } from 'uuid';


const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
    _id: { type: String, required: true, default: () => uuid() },
    amount: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    tranDescription: {
        type: String,
        required: true
    },
    tranType: {
        type: String,
        required: true,
        enum: ["CR", "DR"]
    },
    iban: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('transactions', TransactionsSchema);