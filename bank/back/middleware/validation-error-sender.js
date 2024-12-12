import {validationResult} from 'express-validator';

const ValidationErrorSender = function(req,res,next) {
    let errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        let validationErrors = [];
        errors.array().map((error) => {
            console.log(error.msg);
            validationErrors.push(error.msg);
        });

        return res.status(400).json({"error" : "Bad request", "message" : validationErrors});
    }

    next();
};

export default ValidationErrorSender;



    
    