import { resendCode } from "../utils/database.js";

let Resend = async function(req, res) {
    try {
        await resendCode(req.body.email);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to resend code"});
    }

    return res.status(200).json({message: "A new confirmation code was sent to " + req.body.email});
}

export default Resend;