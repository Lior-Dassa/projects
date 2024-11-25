import { createUser } from "../utils/database.js";
import generateSmsCode from "../utils/generate-sms-code.js";
import sendEmail from "../utils/send-email.js";

let Signup = async function(req, res) {
    const userInfo = req.body;

    userInfo.confirmationCode = generateSmsCode();

    try {
        await createUser(userInfo);
    } catch (err) {
        if (err.message == "11000") {
            return res.status(409).json({"error" : "Conflict", "message" :
                 "a user with this email is already registered"});
        } else {
            console.log(err);
            return res.status(500).json({"error" : "Server error", "message" :
                "oh oh something went wrong"});
        }
    }

    sendEmail(userInfo.email, userInfo.confirmationCode);

    res.status(200).json({message: "confirmation code was sent to " + userInfo.email});
}

export default Signup;