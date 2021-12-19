
import jwt from "jsonwebtoken";
const getToken = async (userDataObject) => {
    console.log("came into token data service");
    var tokenParam = {};
    tokenParam._id = userDataObject._id;
    tokenParam.email = userDataObject.email;
    tokenParam.iban = userDataObject.iban;
    return jwt.sign(tokenParam, 'constant_token_secret', {
        expiresIn: '365 days'
    });
};

export default {
    getToken


};