import CC from "currency-converter-lt";


const getTransactions = async (toCurrency, consumerData) => {
    console.log("came in transactions")
    let totalDebitAmount = 0;
    let totalCreditAmount = 0;
    const promises = (await consumerData).map(async (transactionObj) => {
        let singleUserOutput = transactionObj.message;
        let fromCurrency = singleUserOutput.currency;
        let currencyAmount = 1;
        let currencyConverter = new CC({ from: fromCurrency, to: toCurrency, amount: currencyAmount })
        let responseofCurrency = await currencyConverter.convert();
        let outputAmount = singleUserOutput.amount * responseofCurrency;
        singleUserOutput.amount = outputAmount.toFixed(2)
        singleUserOutput.currency = toCurrency;
        if (singleUserOutput.tranType == "DR") {
            totalDebitAmount = totalDebitAmount + outputAmount;
        } else {
            totalCreditAmount = totalCreditAmount + outputAmount;
        }
        return singleUserOutput
    })

    const totalCounts = await Promise.all(promises)
    return {
        totalDebitAmount: totalDebitAmount.toFixed(2),
        totalCreditAmount: totalCreditAmount.toFixed(2),
        transactions: totalCounts

    };
};
export default {
    getTransactions


};