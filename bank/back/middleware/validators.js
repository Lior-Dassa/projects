import {body, validationResult} from 'express-validator';
import getToken from '../utils/get-token.js';
import {verifyAccessToken, verifyRefreshToken} from '../utils/jwt.js';

const NameValidator = [body('firstName').isAlpha().withMessage('first name should include only letters')
    .isLength({min: 1, max: 20}).withMessage('first name should be 1-20 letters'),
        body('lastName').isAlpha().withMessage('last name should include only letters')
        .isLength({min: 1, max: 20})
            .withMessage('last name should be 1-20 letters'),
];

const PhoneValidator = body('phoneNumber').isMobilePhone('he-IL').withMessage('Invalid phone number');

const EmailValidator = body('email').isEmail().withMessage('Invalid email address');

const ToValidator = body('to').isEmail().withMessage('to is not an email');

const AmountValidator = body('amount').isNumeric().withMessage('amount is not a number');

const AccessTokenValidator = function (req, res, next) {

    try {
        const token = getToken(req);
        req.body.email = verifyAccessToken(token);
        
    } catch (error) {
        return res.status(401).json({error: "Unauthorized", message : error.message});
    }

    next();
}

const RefreshTokenValidator = function (req, res, next) {

    try {
        const token = getToken(req);
        req.body.email = verifyRefreshToken(token);
    } catch (error) {
        return res.status(401).json({error: "Unauthorized", message : error.message});
    }

    next();
}

export {NameValidator, PhoneValidator, EmailValidator, ToValidator, AmountValidator,
            AccessTokenValidator, RefreshTokenValidator};