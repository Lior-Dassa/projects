import generateSmsCode from "../utils/generate-sms-code.js";
import sendEmail from "../utils/send-email.js";

let Resend = function(req, res) {
    let smsCode = generateSmsCode();

    sendEmail(req.body.email, smsCode);

    return res.status(200).json({message: "A new confirmation code was sent to " + req.body.email});
}

export default Resend;