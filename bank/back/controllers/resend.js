import mockSMS from "./mocks/mock-sms-confirmation.js";

let Resend = function(req, res) {
    let smsCode = mockSMS();

    return res.status(200).json({code: smsCode});
}

export default Resend;