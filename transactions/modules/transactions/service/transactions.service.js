import Transactions from '../model/Transactions.js';

const createTransaction = async (inputTransaction) => {
    const newTransaction = new Transactions({
        amount: inputTransaction.amount,
        currency: inputTransaction.currency,
        tranDescription: inputTransaction.tranDescription,
        tranType: inputTransaction.tranType,
        iban: inputTransaction.iban
    });
    return await newTransaction.save();
};
const getAllTransaction = async () => {

    return await Transactions.find();
};
export default {
    createTransaction,
    getAllTransaction


};