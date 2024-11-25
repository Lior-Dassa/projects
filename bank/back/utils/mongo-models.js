import mongoose, { Schema } from "mongoose";

const CODE_EXP = 1 * 60 * 1000;

const transactionSchema = new mongoose.Schema({
    "from": String,
    "to": String,
    "amount": {type: mongoose.Schema.Types.Decimal128,
                validate: {
                    validator: (value) => value > 0,
                    message: "Transfer amount must be greater than 0"
                }},
    "time": Date
}, {timestamps: {updatedAt: false}});

const userSchema = new mongoose.Schema({
    "_id": String,
    "password": String,
    "firstName": String,
    "lastName": String,
    "balance": {
        type: mongoose.Schema.Types.Decimal128,
        validate: {
            validator: function(v) {
                return v >= 0;
            },
            message: "Balance can not be negative"
        }
    },
    "transactions": [{type : mongoose.Schema.Types.ObjectId,
                        ref: "Transaction"
    }]
}, {timestamps: true});

const pendingUserSchema = new mongoose.Schema({
    "_id": String,
    "password": String,
    "firstName": String,
    "lastName": String,
    "confirmationCode": String,
    "exp": {
        type: Date,
        default: () => {return (Date.now() + CODE_EXP);}
    }
});

const User = mongoose.model('User', userSchema);
const PendingUser = mongoose.model('PendingUser', pendingUserSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

export {User, PendingUser, Transaction, CODE_EXP};