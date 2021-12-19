import jwt from "jsonwebtoken";

const isAuthenticated = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['token']
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'constant_token_secret', function (err, decoded) {
            if (err) {
                var response = {
                    '_Success_message': 'Failed to authenticate token.',
                    '_status_Code': 304,
                    '_status': 'INVALID_TOKEN',
                    'result': {}
                }
                res.send(response)
            } else {

                req.decoded = Object.assign(decoded, req.decoded);
                next()
            }
        })
    } else {
        var response = {
            '_Success_message': 'No token provided!',
            '_status_Code': 304,
            '_status': 'NO_TOKEN',
            'result': {}
        }
        res.send(response)
    }
};

export default {
    isAuthenticated
};