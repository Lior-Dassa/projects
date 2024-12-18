import mongoose from "mongoose";
import "./db-connection.js";
import generateSmsCode from "../utils/generate-sms-code.js";
import getRandomArbitrary from "./genrate-random-number.js";
import { PendingUser , User, Transaction} from "./mongo-models.js";
import {CODE_EXP} from "../utils/mongo-models.js"
import sendEmail from "./send-email.js";

const createUser = async function(userInfo) {
    const confirmationCode = userInfo.confirmationCode;

    if (await User.findById(userInfo.email)) {
        throw new Error("EMAIL_EXISTS");
    }

    try {
        const newPendingUser = new PendingUser({
            _id: userInfo.email,
            confirmationCode,
            password: userInfo.password,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phoneNumber: userInfo.phoneNumber
        });

        await newPendingUser.save();
    } catch (error) {
        if (error.code == 11000) {
            throw new Error("EMAIL_EXISTS");
        } else {
            throw new Error(error.code);
        }
    }
}

const activateUser = async function (code) {

    const pendingUser = await PendingUser.findOne({"confirmationCode": code});

    if (pendingUser != null) {

        if (Date.now() < pendingUser.exp.valueOf()) {

            const newUser = new User({
                "_id": pendingUser._id,
                "password": pendingUser.password,
                "firstName": pendingUser.firstName,
                "lastName": pendingUser.lastName,
                "phoneNumber": pendingUser.phoneNumber,
                "balance": getRandomArbitrary(1000, 1000000),
                "transactions": []
            });

            const session = await mongoose.connection.startSession();

            try {
                session.startTransaction();

                await newUser.save({session});
                await PendingUser.deleteOne({"confirmationCode": code}, {session});

                await session.commitTransaction();
            } catch (error) {
                session.abortTransaction();

                throw new Error("Uh oh something went wrong");
            } finally {
                session.endSession();
            }
        } else {
            throw new Error("the code has expired");
        }
    
    } else {
        throw new Error("wrong confirmation code");
    }

    return pendingUser._id;
}

const resendCode = async function (email, pendingUser) {
    const newCode = generateSmsCode();
    let user = pendingUser;

    if(!pendingUser) {
        user = await PendingUser.findById(email);
    }

    user.confirmationCode = newCode;
    user.exp = Date.now() + CODE_EXP;
    await user.save();
    await sendEmail(email, newCode);
}

const getUser = async function (email) {
    const user = await User.findById(email).populate("transactions").exec();
    
    return user;
}
   
const getTransactions = async function (email) {
    const user = await getUser(email);
    const transactions = user.transactions;

    return transactions;
}

const processTransaction = async function (transactionInfo) {
    const {email, to, amount} = transactionInfo;
    const parsedAmount = parseFloat(amount);

    const sender = await getUser(email);
    const receiver = await getUser(to);

    if (!sender || !receiver) {
        throw new Error("Unknown user");
    }
    
    const newTransaction = new Transaction({
        from: email,
        to,
        amount: parsedAmount
    });

    const session = await mongoose.connection.startSession();

    try {
        session.startTransaction();

        await newTransaction.save({session});

        sender.balance -= parsedAmount;
        sender.transactions.push(newTransaction._id);
        await sender.save({session});

        receiver.balance = parseFloat(receiver.balance) + parsedAmount;
        receiver.transactions.push(newTransaction._id);
        await receiver.save({session});

        await session.commitTransaction();
        
    } catch (error) {
        await session.abortTransaction();
        throw new Error(error.message);
    } finally {
        session.endSession();
    }
    
}

export {createUser, activateUser, getUser, getTransactions, processTransaction, resendCode};
