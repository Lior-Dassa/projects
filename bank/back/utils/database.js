import mongoose from "mongoose";
import generateSmsCode from "../utils/generate-sms-code.js";
import getRandomArbitrary from "./genrate-random-number.js";
import mockSMS from "../controllers/mocks/mock-sms-confirmation.js";
import { PendingUser , User, Transaction, CODE_EXP} from "./mongo-models.js";

const createUser = async function(userInfo) {
    const confirmationCode = generateSmsCode();

    if (await User.findById(userInfo.email)) {
        throw new Error("11000");
    }

    try {
        const newPendingUser = new PendingUser({
            _id: userInfo.email,
            confirmationCode: userInfo.confirmationCode,
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

            await newUser.save();
            await PendingUser.deleteOne({"confirmationCode": code});

        } else {
            const newCode = generateSmsCode();

            

            pendingUser.confirmationCode = newCode;
            pendingUser.exp = Date.now() + CODE_EXP;

            await pendingUser.save();

            mockSMS(newCode);
            throw new Error("the code expired, a new one has been sent");
        }
    
    } else {
        throw new Error("wrong confirmation code");
    }

    return pendingUser._id;
}

const getUser = async function (email) {
    const user = await User.findById(email);
    
    return user;
}
   

export {createUser, activateUser, getUser};
