import mongoose from "mongoose";
import "./db-connection.js";
import generateSmsCode from "../utils/generate-sms-code.js";
import getRandomArbitrary from "./genrate-random-number.js";
import { PendingUser , User, Transaction} from "./mongo-models.js";
import {CODE_EXP} from "../utils/mongo-models.js"
import sendEmail from "./send-email.js";

const createUser = async function(userInfo) {
    const confirmationCode = generateSmsCode();

    if (await User.findById(userInfo.email)) {
        throw new Error("EMAIL_EXISTS");
    }

    try {
        const newPendingUser = new PendingUser({
            _id: userInfo.email,
            confirmationCode,
            password: userInfo.password,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName
        });

        await newPendingUser.save();
    } catch (error) {
        throw new Error(error.code);
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
            const newCode = generateSmsCode();

            pendingUser.confirmationCode = newCode;
            pendingUser.exp = Date.now() + CODE_EXP;

            await pendingUser.save();

            sendEmail(pendingUser._id, newCode);
            throw new Error("the code expired, a new one has been sent to " + pendingUser.email);
        }
    
    } else {
        throw new Error("wrong confirmation code");
    }

    return pendingUser._id;
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
    amount = parseFloat(amount);

    const sender = await getUser(email);
    const receiver = await getUser(to);

    if (!sender || !receiver) {
        throw new Error("Unknown user");
    }
    
    const newTransaction = new Transaction({
        from: email,
        to,
        amount
    });

    const session = await mongoose.connection.startSession();

    try {
        session.startTransaction();

        await newTransaction.save({session});

        sender.balance -= amount;
        sender.transactions.push(newTransaction._id);
        await sender.save({session});

        receiver.balance = parseFloat(receiver.balance) + amount;
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

export {createUser, activateUser, getUser, getTransactions, processTransaction};
