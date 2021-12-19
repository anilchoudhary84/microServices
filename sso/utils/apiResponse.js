
const apiResponse = (message, status, result) => {
    let response = {};
    if (!result)
        result = '';
    if (status === "SUCCESS") {
        return response = {
            "_error_message": "none",
            "_success_message": message,
            "_status_Code": 200,
            "_status": "done",
            "result": result
        }
    }
    else if (status === "VALIDATION_ERROR") {
        return response = {
            "_error_message": message,
            "_success_message": "none",
            "_status_Code": 407,
            "_status": "Validation Error",
            "result": result
        }
    }
    else if (status === "FATAL_ERROR") {
        return response = {
            "_error_message": "Error",
            "_success_message": "none",
            "_status_Code": 406,
            "_status": "error",
            "result": result
        }
    }
    else if (status === "DUPLICATE_ERROR") {
        return response = {
            "_error_message": message,
            "_success_message": "none",
            "_status_Code": 405,
            "_status": "Duplicate Error",
            "result": result
        }
    }
    else if (status === "INVALID_TOKEN") {
        return response = {
            '_Success_message': message,
            '_status_Code': 403,
            '_status': 'error',
            'result': result
        }
    }
    else if (status === "NO_TOKEN") {
        return response = {
            '_Success_message': message,
            '_status_Code': 403,
            '_status': 'error',
            'result': result
        }
    }

    else if (status === "ERROR") {
        return response = {
            "_error_message": message,
            "_success_message": "none",
            "_status_Code": 406,
            "_status": "error",
            "result": result
        }
    }

    else if (status === "NO_DATA") {
        return response = {
            "_error_message": "none",
            "_success_message": message,
            "_status_Code": 304,
            "_status": "done",
            "result": result
        }
    }



    else {
        return response = {
            "_error_message": message,
            "_success_message": "none",
            "_status_Code": parseInt(status),
            "_status": "error",
            "result": result
        }
    }
};



export default {
    apiResponse


};

