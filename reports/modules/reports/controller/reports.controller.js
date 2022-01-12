import ReportService from '../service/report.service.js'
import ConsumerService from '../service/consumer.js'
import jwt_decode from 'jwt-decode';

class TransactionEntryController {
    static async createParition() {
        try {

            await ConsumerService.createParition();

        } catch (err) {
            console.log("here is error in report creating portion ", err)

        }
    }
    static async startConsumer() {

        try {
            console.log("consumer Started")
            await ConsumerService.consumeMessage();

        } catch (err) {
            console.log("here is error in report getting consumer messages", err)

        }
    }
    static async getTransactions(req, res) {


        try {

            const token = req.body.token || req.query.token || req.headers['token'];
            var resultToken = jwt_decode(token);
            let userIban = null;
            console.log(JSON.stringify(resultToken));
            if (resultToken) {
                userIban = resultToken.iban;

            }
            console.log("params month", req.params.month)
            console.log("params page", req.query.page)
            console.log("params limit", req.query.limit)
            console.log("params limit", req.query.limit)

            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            let toCurrency = req.params.currency;
            const consumerData = await ConsumerService.getAllTransaction();
            console.log("here is consumer data, ", JSON.stringify(consumerData));


            // var monthlyData = req.params.month != undefined ? consumerData.filter(function (el) {
            //     return new Date(el.message.createdOn).getMonth() + 1 == req.params.month;
            // }) : consumerData;
            let monthlyData = [];
            if (req.params.month != undefined) {
                for (let i = 0; i < consumerData.length; i++) {
                    let messageMonth = new Date(consumerData[i].message.createdOn).getMonth();
                    console.log("message month", messageMonth);
                    messageMonth = messageMonth + 1;
                    console.log("message month after adding", messageMonth)
                    if (messageMonth == req.params.month) {
                        monthlyData.push(consumerData[i]);
                    }
                }
            } else {
                monthlyData = consumerData;
            }


            console.log("here is monthly  data, ", JSON.stringify(monthlyData));
            var userSpecificData = userIban != null ? monthlyData.filter(function (el) {
                return el.message.iban == userIban;
            }) : monthlyData;
            console.log("here is user specific  data, ", JSON.stringify(userSpecificData));
            const inputConsumerData = userSpecificData.slice(startIndex, endIndex);
            console.log("here is final  data, ", JSON.stringify(userSpecificData));
            let result = await ReportService.getTransactions(toCurrency, inputConsumerData);
            if (endIndex < userSpecificData.length) {
                console.log("here is final  data11, ");
                result['next'] = {
                    page: page + 1,
                    limit: limit
                }
                console.log("here is final  data22, ");
            }
            if (startIndex > 0) {
                console.log("here is final  data33, ");
                result['previous'] = {
                    page: page - 1,
                    limit: limit
                }
                console.log("here is final  data44, ");
            }

            var response = {
                '_Success_message': result?.transactions?.length + ' transactions found',
                '_status_Code': 200,
                '_status': 'success',
                'result': result
            }
            console.log("here is final  data55, ");
            res.send(response);
        } catch (err) {
            console.log("throwing error here in reports")
            res.status(404).send({ message: err.toString() });
        }
    }


}


export default TransactionEntryController;