import {body} from 'express-validator';

const NameValidator = [body('firstName').isAlpha().withMessage('first name should include only letters')
    .isLength({min: 1, max: 20}).withMessage('first name should be 1-20 letters'),
        body('lastName').isAlpha().withMessage('last name should include only letters')
        .isLength({min: 1, max: 20})
            .withMessage('last name should be 1-20 letters'),
];

const PhoneValidator = body('phoneNumber').isMobilePhone('he-IL').withMessage('Invalid phone number');

const EmailValidator = body('email').isEmail().withMessage('Invalid email address');

export {NameValidator, PhoneValidator, EmailValidator};