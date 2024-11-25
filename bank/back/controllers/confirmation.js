import {generateRefreshToken, generateAccessToken} from "../utils/jwt.js";
import { activateUser } from "../utils/database.js";

let Confirmation = async function(req, res) {
    const code = req.body.confirmationCode;
    let email = null;

    try {
        email = await activateUser(code);
    } catch (err) {
        if (err.message == "Uh oh something went wrong") {
            return res.status(500).json({"error" : "Server error", "message" : err.message});
        }
        return res.status(400).json({"error" : "Bad request", "message" : err.message});
    }

    res.status(200).json({message: "user was successfully registered"});
}

export default Confirmation;