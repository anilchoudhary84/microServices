import UserDataService from '../service/userData.service.js';
import TokenService from '../service/tokenGenerator.service.js';
import UtilResponse from '../../../utils/apiResponse.js';
import jwt_decode from 'jwt-decode';

class AuthController {
    static async login(req, res) {

        try {
            const result = await UserDataService.login(req.body.email);
            if (result) {
                let tokenValue = await TokenService.getToken(result);
                res.append("token", tokenValue)
                return res.json(UtilResponse.apiResponse('Login success', 'SUCCESS', null));
            } else {
                return res.json(UtilResponse.apiResponse('No User found !', 'NO_DATA', null));
            }
        } catch (err) {
            res.status(404).send({ message: err.toString() });
        }
    }


    static async add(req, res) {
        try {
            const result = await UserDataService.addUser(req.body);
            if (result) {
                return res.json(UtilResponse.apiResponse('User Added!', 'SUCCESS', result));

            } else {
                return res.json(UtilResponse.apiResponse('could not add user', 'NO_DATA', null));
            }
        } catch (err) {

            res.status(404).send({ message: err.toString() });
        }
    }

    static async verify(req, res) {
        try {
            const token = req.body.token || req.query.token || req.headers['token'];
            var result = jwt_decode(token);
            if (result) {
                var responseObj = {
                    "email": result.email,
                    "iban": result.iban
                }
                return res.json(UtilResponse.apiResponse('Authentication success', 'SUCCESS', responseObj));
            } else {
                return res.json(UtilResponse.apiResponse('No token provided !', 'NO_TOKEN', null));
            }
        } catch (err) {
            res.status(404).send({ message: err.toString() });
        }
    }
}

export default AuthController;

