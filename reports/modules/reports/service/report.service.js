import CC from "currency-converter-lt";


const getTransactions = async (toCurrency, consumerData) => {
    console.log("came in transactions")
    let totalDebitAmount = 0;
    let totalCreditAmount = 0;
    const promises = (await consumerData).map(async (transactionObj) => {
        let singleUserOutput = transactionObj.message;
        let fromCurrency = singleUserOutput.currency;
        let currencyAmount = 1;
        console.log("before", JSON.stringify(singleUserOutput));
        let currencyConverter = new CC({ from: fromCurrency, to: toCurrency, amount: currencyAmount })
        console.log("before 11", JSON.stringify(singleUserOutput));
        let responseofCurrency = await currencyConverter.convert();
        console.log("before 22", JSON.stringify(singleUserOutput));
        let outputAmount = singleUserOutput.amount * responseofCurrency;
        singleUserOutput.amount = outputAmount.toFixed(2)
        singleUserOutput.currency = toCurrency;
        console.log("after", JSON.stringify(singleUserOutput));
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