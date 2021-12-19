
import mongoose from 'mongoose'

import { v4 as uuid } from 'uuid';


const Schema = mongoose.Schema;

const UserDataSchema = new Schema({
    _id: { type: String, required: true, default: () => uuid() },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    iban: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inActive"],
        default: 'active'
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('userData', UserDataSchema);