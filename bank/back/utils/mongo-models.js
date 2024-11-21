import mongoose from "mongoose";

const CODE_EXP = 1 * 60 * 1000;

const transactionSchema = new mongoose.Schema({
    "from": String,
    "to": String,
    "amount": Number,
    "time": Date
});

const userSchema = new mongoose.Schema({
    "_id": String,
    "password": String,
    "firstName": String,
    "lastName": String,
    "balance": Number,
    "transactions": [mongoose.Schema.Types.ObjectId]
}, {timestamps: true});

const pendingUserSchema = new mongoose.Schema({
    "_id": String,
    "password": String,
    "firstName": String,
    "lastName": String,
    "confirmationCode": String,
    "exp": {
        type: Date,
        default: () => {return (Date.now() + (CODE_EXP));}
    }
});

const User = mongoose.model('User', userSchema);
const PendingUser = mongoose.model('PendingUser', pendingUserSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

export {User, PendingUser, Transaction, CODE_EXP};